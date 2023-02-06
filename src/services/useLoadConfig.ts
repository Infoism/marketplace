import { isDir, isExist } from '../utils';
import path from 'path';
import fs from 'fs';
import { computed, reactive } from 'vue';
import { IS_DEV, packageTypes, status } from '../constant';

type packageConfig = {
  // 标题
  title: string;
  // 描述
  description: string;
  // 仓库
  repo: string;
  // logo
  logo: string;
  // 插件类型
  type: packageTypes;
  // 仅在插件类型为微应用时加载icon
  icon?: string;
  // 插件作者
  author?: string;
  // 捐助地址
  sponsor?: string[];
  // dev插件标识
  dev?: boolean;
};
type packageInterface = {
  name: string;
  config?: packageConfig;
  status: status;
  message?: string;
};
type Packages = Record<string, packageInterface>;
type validatorRes = {
  status?: status;
  message?: string;
};

// 检查config.json是否合法，并输出信息
function packageConfigValidator(packages: Packages, name: string) {
  /**
   * TODO 检查字段是否缺失
   * TODO 检查仓库是否可访问
   * TODO 检查仓库release是否符合约定
   */
  const validatorPromise = new Promise<validatorRes>((resolve) => {
    resolve({
      status: 'success',
      message: '',
    });
  }).then((res) => {
    const { status = 'success', message = '' } = res;
    packages[name].status = status;
    packages[name].message = message;
    return packages[name];
  });
  return validatorPromise;
}

function buildProcess(pkg: packageInterface[]) {
  const outputPath = path.resolve('out');
  if (!isExist(outputPath)) {
    fs.mkdir(outputPath, () => {});
  }
  const outFilePath = path.resolve(outputPath, 'marketplace.json');
  fs.writeFileSync(outFilePath, JSON.stringify(pkg, null, 2));
  return IS_DEV ? undefined : process.exit(0);
}

export function useLoadConfig() {
  const packagesPath = path.resolve('./packages');
  const packagesNames = fs.readdirSync(packagesPath).filter((dir) => {
    const packagePath = path.resolve(packagesPath, dir);
    if (!isDir(packagePath)) {
      return false;
    }
    const packageConfig = path.resolve(packagePath, 'config.json');
    if (!isExist(packageConfig)) {
      return false;
    }
    return true;
  });

  const packages = reactive<Packages>({});
  const validators: Promise<packageInterface>[] = [];

  // 依次读取config.json 并进行有效性验证
  packagesNames.forEach((packageName) => {
    const configPath = path.resolve(packagesPath, packageName, 'config.json');
    const configFile = fs.readFileSync(configPath, { encoding: 'utf-8' });
    try {
      packages[packageName] = {
        name: packageName,
        config: JSON.parse(configFile),
        status: 'loading',
        message: '',
      };
      validators.push(packageConfigValidator(packages, packageName));
    } catch (e) {
      packages[packageName] = {
        name: packageName,
        config: undefined,
        status: 'error',
        message: 'import "config.json" failed',
      };
    }
  });

  const packagesArr = computed(() => {
    return Object.values(packages).sort((pkg) => pkg.name as unknown as number);
  });

  const packagesValid = computed(() => {
    return packagesArr.value.filter(
      (pkg) => pkg.config && pkg.status === 'success'
    );
  });
  Promise.allSettled(validators).then(() => {
    buildProcess(packagesValid.value);
  });

  return { packages, packagesArr, packagesValid };
}

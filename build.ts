import path from 'path';
import fs from 'fs';

function isDir(target: string) {
  return fs.lstatSync(target).isDirectory();
}

function isExist(target: string) {
  return fs.existsSync(target);
}

const packagesPath = path.resolve('./packages');
const packages = fs.readdirSync(packagesPath).filter((dir) => {
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
console.log(packages);

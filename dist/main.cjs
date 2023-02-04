"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/main.ts
var import_core2 = require("@temir/core");

// vue:./Build.vue
var import_vue2 = require("vue");
var import_vue3 = require("vue");
var import_core = require("@temir/core");

// src/utils/index.ts
var import_fs = __toESM(require("fs"), 1);
function isDir(target) {
  return import_fs.default.lstatSync(target).isDirectory();
}
function isExist(target) {
  return import_fs.default.existsSync(target);
}

// src/services/useLoadConfig.ts
var import_path = __toESM(require("path"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var import_vue = require("vue");

// src/constant/index.ts
var PACKAGE_EMOJI = {
  app: "\u{1F4E6}",
  theme: "\u{1F455}",
  extension: "\u2692\uFE0F",
  default: "\u{1F4E6}"
};
var STATUS_COLOR = {
  loading: "yellowBright",
  success: "green",
  error: "red"
};
var IS_DEV = process.env["NODE_ENV"] === "development";

// src/services/useLoadConfig.ts
function packageConfigValidator(packages, name) {
  const validatorPromise = new Promise((resolve) => {
    resolve({
      status: "success",
      message: ""
    });
  }).then((res) => {
    const { status: status2 = "success", message = "" } = res;
    packages[name].status = status2;
    packages[name].message = message;
    return packages[name];
  });
  return validatorPromise;
}
function buildProcess(pkg) {
  const outputPath = import_path.default.resolve("out");
  if (!isExist(outputPath)) {
    import_fs2.default.mkdir(outputPath, () => {
    });
  }
  import_fs2.default.writeFileSync(
    import_path.default.resolve(outputPath, "marketplace.json"),
    JSON.stringify(pkg, null, 2)
  );
  return IS_DEV ? void 0 : process.exit(0);
}
function useLoadConfig() {
  const packagesPath = import_path.default.resolve("./packages");
  const packagesNames = import_fs2.default.readdirSync(packagesPath).filter((dir) => {
    const packagePath = import_path.default.resolve(packagesPath, dir);
    if (!isDir(packagePath)) {
      return false;
    }
    const packageConfig = import_path.default.resolve(packagePath, "config.json");
    if (!isExist(packageConfig)) {
      return false;
    }
    return true;
  });
  const packages = (0, import_vue.reactive)({});
  const validators = [];
  packagesNames.forEach((packageName) => {
    const configPath = import_path.default.resolve(packagesPath, packageName, "config.json");
    const configFile = import_fs2.default.readFileSync(configPath, { encoding: "utf-8" });
    try {
      packages[packageName] = {
        name: packageName,
        config: JSON.parse(configFile),
        status: "loading",
        message: ""
      };
      validators.push(packageConfigValidator(packages, packageName));
    } catch (e) {
      packages[packageName] = {
        name: packageName,
        config: void 0,
        status: "error",
        message: 'import "config.json" failed'
      };
    }
  });
  const packagesArr = (0, import_vue.computed)(() => {
    return Object.values(packages).sort((pkg) => pkg.name);
  });
  const packagesValid = (0, import_vue.computed)(() => {
    return packagesArr.value.filter(
      (pkg) => pkg.config && pkg.status === "success"
    );
  });
  Promise.allSettled(validators).then(() => {
    buildProcess(packagesValid.value);
  });
  return { packages, packagesArr, packagesValid };
}

// vue:./Build.vue
var import_vue4 = require("vue");
var __sfc_main = /* @__PURE__ */ (0, import_vue2.defineComponent)({
  setup(__props) {
    const { packages } = useLoadConfig();
    const packagesArr = (0, import_vue4.computed)(() => {
      return Object.values(packages).sort((pkg) => pkg.name);
    });
    return (_ctx, _cache) => {
      return (0, import_vue3.openBlock)(), (0, import_vue3.createBlock)((0, import_vue3.unref)(import_core.TBox), {
        "align-items": "flex-start",
        "flex-direction": "column",
        "justify-content": "center"
      }, {
        default: (0, import_vue3.withCtx)(() => [
          (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TBox), {
            "border-style": "double",
            "border-color": "greenBright",
            "justify-content": "center",
            "align-items": "center"
          }, {
            default: (0, import_vue3.withCtx)(() => [
              (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TText), { color: "white" }, {
                default: (0, import_vue3.withCtx)(() => [
                  (0, import_vue3.createTextVNode)(" \u{1F44B} Building Start !! ")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TBox), null, {
            default: (0, import_vue3.withCtx)(() => [
              (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TBox), {
                "flex-direction": "column",
                "min-width": "10"
              }, {
                default: (0, import_vue3.withCtx)(() => [
                  ((0, import_vue3.openBlock)(true), (0, import_vue3.createElementBlock)(import_vue3.Fragment, null, (0, import_vue3.renderList)((0, import_vue3.unref)(packagesArr), (pkg) => {
                    return (0, import_vue3.openBlock)(), (0, import_vue3.createBlock)((0, import_vue3.unref)(import_core.TBox), null, {
                      default: (0, import_vue3.withCtx)(() => [
                        (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TText), {
                          color: (0, import_vue3.unref)(STATUS_COLOR)[pkg.status]
                        }, {
                          default: (0, import_vue3.withCtx)(() => [
                            (0, import_vue3.createTextVNode)((0, import_vue3.toDisplayString)((0, import_vue3.unref)(PACKAGE_EMOJI)?.[pkg.config?.type || "default"]), 1)
                          ]),
                          _: 2
                        }, 1032, ["color"]),
                        (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TText), {
                          color: (0, import_vue3.unref)(STATUS_COLOR)[pkg.status]
                        }, {
                          default: (0, import_vue3.withCtx)(() => [
                            (0, import_vue3.createTextVNode)((0, import_vue3.toDisplayString)(pkg.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["color"]),
                        (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TSpacer)),
                        (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TText), {
                          color: (0, import_vue3.unref)(STATUS_COLOR)[pkg.status]
                        }, {
                          default: (0, import_vue3.withCtx)(() => [
                            (0, import_vue3.createTextVNode)((0, import_vue3.toDisplayString)(pkg.status), 1)
                          ]),
                          _: 2
                        }, 1032, ["color"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 256))
                ]),
                _: 1
              }),
              (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TBox), { width: "1" }),
              (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TBox), {
                "flex-direction": "column",
                "min-width": "10"
              }, {
                default: (0, import_vue3.withCtx)(() => [
                  ((0, import_vue3.openBlock)(true), (0, import_vue3.createElementBlock)(import_vue3.Fragment, null, (0, import_vue3.renderList)((0, import_vue3.unref)(packagesArr), (pkg) => {
                    return (0, import_vue3.openBlock)(), (0, import_vue3.createBlock)((0, import_vue3.unref)(import_core.TBox), null, {
                      default: (0, import_vue3.withCtx)(() => [
                        (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TText), {
                          color: (0, import_vue3.unref)(STATUS_COLOR)[pkg.status]
                        }, {
                          default: (0, import_vue3.withCtx)(() => [
                            (0, import_vue3.createTextVNode)((0, import_vue3.toDisplayString)(pkg.status === "success" ? "\u2713" : pkg.status === "error" ? "\xD7" : "."), 1)
                          ]),
                          _: 2
                        }, 1032, ["color"]),
                        (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TBox), { width: "4" }),
                        (0, import_vue3.createVNode)((0, import_vue3.unref)(import_core.TText), {
                          color: (0, import_vue3.unref)(STATUS_COLOR)[pkg.status]
                        }, {
                          default: (0, import_vue3.withCtx)(() => [
                            (0, import_vue3.createTextVNode)((0, import_vue3.toDisplayString)(pkg.message), 1)
                          ]),
                          _: 2
                        }, 1032, ["color"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 256))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
var Build_default = __sfc_main;

// src/main.ts
(0, import_core2.render)(Build_default);

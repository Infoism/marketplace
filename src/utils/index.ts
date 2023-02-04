import fs from 'fs';

export function isDir(target: string) {
  return fs.lstatSync(target).isDirectory();
}

export function isExist(target: string) {
  return fs.existsSync(target);
}

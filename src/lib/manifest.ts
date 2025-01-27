import { opendir, readFile } from "fs/promises";
import { join } from "path";
let mf: Manifest = {};

export interface Manifest {
  [key: string]: {
    works: string[];
    selected?: string[];
    name?: string;
    sources?: { [name: string]: string }
  };
}

export const generate = async () => {
  if (Object.keys(mf).length !== 0) return mf;
  const units = await opendir("static/images/");
  const manifest: Manifest = {};
  while (true) {
    const dirent = await units.read();
    if (!dirent) break;
    if (dirent.isDirectory()) {
      const unit = await opendir(join(dirent.parentPath, dirent.name));
      manifest[dirent.name] = { works: [] };
      while (true) {
        const f = await unit.read();
        if (!f) break;
        if (f.isFile()) {
          if (f.name.endsWith(".json")) {
            const unitManifestFile = await readFile(join(f.parentPath, f.name));
            const unitManifest = JSON.parse(unitManifestFile.toString("utf-8"));
            manifest[dirent.name] = Object.assign(
              manifest[dirent.name],
              unitManifest
            );
          } else if (f.name.endsWith(".jpg")) {
            manifest[dirent.name].works.push(f.name);
          }
        }
      }
    }
  }
  console.log(manifest);
  mf = manifest;

  return manifest;
};

generate();

export default mf;

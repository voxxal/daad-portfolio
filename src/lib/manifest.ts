import { opendir, readFile } from "fs/promises";
import { join } from "path";
let mf: Manifest = {};


export type ManifestEntry = NormalManifestEntry | FantasticalManifestEntry
export interface NormalManifestEntry {
  layout: undefined | "",
  works: string[];
  selected?: string[];
  name?: string;
  sources?: { [name: string]: string };
}

export interface FantasticalManifestEntry {
  layout: "fantastical";
  works: {
    wips: number;
    name: string;
    path: string;
    category: string;
    description: string;
    sources: { [name: string]: string };
  }[];
}

export interface Manifest {
  [key: string]: ManifestEntry;
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
      manifest[dirent.name] = {} as any;

      const imgs = [];
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
            imgs.push(f.name);
          }
        }
      }

      if (manifest[dirent.name].layout == "fantastical") {
      } else if (!manifest[dirent.name].layout){
        manifest[dirent.name].works = imgs;
      }
    }
  }
  console.log(manifest);
  mf = manifest;

  return manifest;
};

generate();

export default mf;

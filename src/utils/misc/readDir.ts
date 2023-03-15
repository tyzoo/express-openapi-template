import fs from "fs";
import path from "path";

export const readDir = async (directoryPath: string, extensions?: string[]): Promise<string[]> => {
    const files: string[] = [];
  
    const contents = await fs.promises.readdir(directoryPath);
  
    for (const item of contents) {
      const itemPath = path.join(directoryPath, item);
      const isFile = await fs.promises.stat(itemPath).then(stats => stats.isFile());
  
      if (isFile) {
        if(extensions){
            const ext = path.extname(itemPath);
            if (extensions.includes(ext)) {
              files.push(itemPath);
            }
        }else{
            files.push(itemPath);
        }
      } else {
        const subdirectoryFiles = await readDir(itemPath);
        files.push(...subdirectoryFiles);
      }
    }
  
    return files;
  }
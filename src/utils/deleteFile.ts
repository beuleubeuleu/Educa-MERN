import * as fs from "fs";

export async function deleteFile(filePath: string) {
  if(filePath.startsWith("images/default")) return
  await fs.unlink(filePath, (err) => {
    console.error(err)
  });
}
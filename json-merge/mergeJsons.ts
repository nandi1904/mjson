import * as fs from 'fs-extra';
import * as path from 'path';

async function mergeJsonFiles() {
  const folderPath = path.join(mergeJsonFiles, 'folder_with_jsons');
  const mergedOutputPath = path.join(mergeJsonFiles, 'merged_output.json');

  try {
    const files = await fs.readdir(folderPath);

    const jsonObjects: any[] = [];

    for (const file of files) {
      if (path.extname(file) === '.json') {
        const filePath = path.join(folderPath, file);
        const content = await fs.readJson(filePath);
        jsonObjects.push(content);
      }
    }

    const mergedOutput = JSON.stringify(jsonObjects, null, 2);
    await fs.writeFile(mergedOutputPath, mergedOutput);

    console.log('JSON files successfully merged into merged_output.json');
  } catch (err) {
    console.error('Error occurred while merging JSON files:', err);
  }
}

mergeJsonFiles().catch(console.error);

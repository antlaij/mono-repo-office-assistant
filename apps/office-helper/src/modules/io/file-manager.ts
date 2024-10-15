import * as fs from 'fs';
import * as path from 'path';
import { of } from 'rxjs/internal/observable/of';
import { FOLDER_STRUCTURE } from '@mono-repo-office/models';



const processTaskSuccessful = (productInfo: any) => {
  console.log('processTaskSuccessful - (productInfo)', productInfo);
}

const processTaskFail: (error: any) => void = (error) => {
  console.error(error);
}

const fixFolderPath: (folderPath: string) => string = (folderPath: string) => {
  return folderPath.replace(/ & /ig, '-n-').replace(/:/ig, '-').replace(/ /ig, '-');
};

const nestedObjectToStringArray: (nestedObj: any) => Array<string> = (nestedObj: any) => {
  const paths: Array<string> = [];
  Object.keys(nestedObj).forEach(nestedKey => {
    const generatedPaths = [];
    if(Object.keys(nestedObj[nestedKey]).length > 0) {
      const subFolders = nestedObjectToStringArray(nestedObj[nestedKey]);
      subFolders.forEach(subFolder => {
        generatedPaths.push(`${fixFolderPath(nestedKey)}/${fixFolderPath(subFolder)}`);
      })
    } else {
      generatedPaths.push(fixFolderPath(nestedKey));
    }
    paths.push(...generatedPaths);
  });
  return paths;
};

/**
 * Create Folder from json
 * @param structure
 */
const createFolderStructureFromObject = (structure: any) => (targetFolder: string) =>  {
  const paths = nestedObjectToStringArray(structure);
  createStructure(targetFolder, paths);
};

/**
 * Create Inventory Folder
 * @param targetFolder
 */
const createNewOffice = createFolderStructureFromObject(FOLDER_STRUCTURE.OFFICE);

const createWorkFolder = (targetoPath: string) => {
  return of([])
    .subscribe({
      next: processTaskSuccessful,
      error: processTaskFail,
      complete: () => console.log('folderToJsonWithFilter => Completed!'),
    });
}

/**
 * Create a folder structure
 */
const createStructure = (basePath: string, subFolders: Array<string>): void => {
  /**
   * cycle through each subFolders
   */
  for (const eachFolder of subFolders) {
    create(path.join(basePath, eachFolder));
  }
}


/** @function
 * @name create
 * @param {string} folderPath - folder path to create
 * @return boolean
 */
const create = (folderPath: string): boolean => {
  /**
   * Get parent folder name from target path
   */
  /**
      Get parent folder name from target path
      @member
      @private
      @type {string}
  */
  const parentFolderPath: string = path.dirname(folderPath);

  /**
   * If parent folder does not exist then create it
   */
  if (!fs.existsSync(parentFolderPath)) {
    create(parentFolderPath);
  }

  /**
   * If target folder doex not exist then create it
   */
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  return true;
}



 /**
   * Export functions
   */
  export  {
    createNewOffice,
    createWorkFolder,
  }

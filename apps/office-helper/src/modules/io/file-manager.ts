import { of } from 'rxjs/internal/observable/of';



const processTaskSuccessful = (productInfo: any) => {
  console.log('processTaskSuccessful - (productInfo)', productInfo);
}

const processTaskFail: (error: any) => void = (error) => {
  console.error(error);
}

const createWorkFolder = (targetoPath: string) => {
  return of([])
    .subscribe({
      next: processTaskSuccessful,
      error: processTaskFail,
      complete: () => console.log('folderToJsonWithFilter => Completed!'),
    });
}



 /**
   * Export functions
   */
  export  {
    createWorkFolder,
  }

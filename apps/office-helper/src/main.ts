import * as io from './modules/io';

console.log('[-- Home Assistant Task! --]');

const executable = {
  io: io,
};

const getFunction = (module: any, functions: Array<string>) => {
  return functions.reduce((acc, functionName: string) => {
    if(acc === undefined) return undefined;
    if(functionName in acc){
      acc = acc[functionName];
    } else {
      acc = undefined;
    }
    // console.log('acc', acc);
    // console.log('functionName', functionName);
    return acc;
  }, module);
}

const [moduleName, functionNames, ...args] = process.argv.slice(2);

console.log('Home Assistant -   (moduleName)', moduleName);
console.log('Home Assistant - (functionNames)', functionNames);

// Input validation
if (moduleName === null || moduleName === undefined) {
  console.log('Home Assistant - does not provide moduleName');
  process.exit(1);
}

if (functionNames === null || functionNames === undefined) {
  console.log('Home Assistant - does not provide functionNames');
  process.exit(1);
}

const executeFunction = getFunction(executable[moduleName as keyof object], functionNames.split('.'));

if(executeFunction){
  // executable.shopping.priceWatch.getProductInfo;
  const executionResult = executeFunction(...args);

  if (executionResult instanceof Promise) {
    console.log('executionResult instanceof Promise');
    executionResult
      .then(returnValue => {
        console.log('Promise Returns:', returnValue);
        // process.exit(0);
      })
      .catch(error => console.error(error));
  } else if (typeof executionResult === 'string') {
    console.log('executionResult is a String');
    console.log(executionResult);
  } else if (executionResult) {
    console.log('executionResult is an object');
    // process.exit(0);
  } else {
    console.log('in else', executionResult);
    // process.exit(0);
  }
} else {
  console.log('Target function does not exist!');
}

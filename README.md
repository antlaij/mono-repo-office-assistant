# mono-repo-office-assistant

## Install Package
### AG Grid
```bat
npm install ag-grid-react
```

---

## Start
### Generate Nx workspace
```bat
cd c:\temp
c:
npx create-nx-workspace@latest mono-repo-office --appName=office-micro-service --preset=nest --skipGit=true

```


### Generate nextjs App - office-full-stack
```bat
npx nx g @nx/next:init --keepExistingVersions --updatePackageScripts
npx nx generate @nx/next:application --name=office-full-stack  --directory=apps/office-full-stack --projectNameAndRootFormat=as-provided --style=scss

```


### Generate nextjs module
```bat
pnpm exec nx generate @nx/nest:module --name=static --directory=apps/office-micro-service/src/app/modules --language=ts --nameAndDirectoryFormat=as-provided --no-interactive --dry-run
```


### Generate Nestjs library
```bat
npx nx g @nx/nest:lib common-nest-lib --publishable --importPath=@mono-repo-workspace/common-nest-lib
npx nx generate @nx/js:library config --unitTestRunner=jest --bundler=tsc --includeBabelRc --simpleName
```


### Generate Node library
```bat
npx nx generate @nx/node:library --name=libs/models --projectNameAndRootFormat=as-provided --no-interactive --dry-run
```


## Generate Nodejs app
npx nx generate @nx/node:application office-helper --framework=none




### Create node library
```bat
npx nx generate @nx/js:library config --directory=libs/config --publishable --unitTestRunner=jest --bundler=tsc --importPath=@mono-repo-office/config --dry-run
```


### Install Tailwind CSS
```bat
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```


### Install @nestjs/serve-static
```bat
pnpm add @nestjs/serve-static
```

---

## Application setting
### Create .env file to store the environmental variables
```txt
NX_OFFICE_ROOT=C:\Temp\data
NX_OFFICE_WEB=C:\Temp\webServer
```

---

## Start application
### Start or run api
```bat
cd c:\temp\mono-repo-office
c:
npm run start:api
```
### Start or run web
```bat
cd c:\temp\mono-repo-office
c:
npm run start:oa
```


### Production: Run web app 
```bat
REM Production Server
cd c:\Microservices\Office-Assistant\office-full-stack
c:
set PORT=8090
npm run start

REM Production server
cd c:\Microservices\Office-Assistant\office-micro-service
c:
set PORT=8001
node main.js
```

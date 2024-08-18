import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const webServerRoot = 'web';
const serveStaticOptions = {
  fallthrough: false,
  index: false
};

@Module({
  imports:[
    // Serving static route to Public Web server
    ServeStaticModule.forRoot({ serveRoot: `/${webServerRoot}/public`, rootPath: join( process.env.NX_OFFICE_WEB, 'public' ), serveStaticOptions, }),
  ],
  controllers: [],
  providers: [],
})

export class StaticModule {}

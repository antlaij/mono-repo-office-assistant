import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { PATH } from '@mono-repo-office/config';

@Injectable()
export class AppService {
  private officeJson = `${process.env.NX_OFFICE_ROOT}\\${PATH.OFFICE.FILE.OFFICE_JSON}`;

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  public getOfficeJson = async <T>(): Promise<T> => this.responseJsonFile(this.officeJson);

  private responseJsonFile = async <T>(Filepath: string): Promise<T> => {
    const jsonObject = this.readJsonToObject<T>(Filepath);
    if (!jsonObject) {
      Logger.error(`MessagePattern(responseJsonFile) Error - Filepath Does not Exist: ${Filepath}`);
      throw new NotFoundException('Resource Not found');
    }
    return jsonObject;
  }

  private readJsonToObject = <T>(filepath: string): T => {
    if (!fs.existsSync(filepath)) {
      return null as T;
    }
    const mediaManagerContent: string = fs.readFileSync(filepath, 'utf8');
    const mediaManagerJson: T = JSON.parse(mediaManagerContent);
    return mediaManagerJson;
  };

}

import * as request from './request';
import * as response from './response';
import pino from 'pino';

export class FilesDownload extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, resource: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'Files.Download';
    this.params = { resource };
  }

  public parse (response: response.JsonrpcBaseResponse): FilesDownloadResponse| null {
    const responseR = new FilesDownloadResponse();
    responseR.error = response.error;
    responseR.id = response.id;

    if ((response.is_error() === true) || (response.result === null)) {
      return null;
    }
    if (response.result && typeof response.result === 'string') {

      responseR.result = response.result; // Store directly the string instead of {token: 'string with the token'}
      return responseR;
    }
    return null;
  }

}
export class FilesDownloadResponse extends response.JsonrpcBaseResponse {
  result?: string;
  constructor () {
    super('FilesDownload');
  }
}

export class FilesCreate extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, resource: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'Files.Create';
    this.params = { resource };
  }

  public parse (response: response.JsonrpcBaseResponse): FilesCreateResponse | null {
    const responseR = new FilesCreateResponse();
    responseR.error = response.error;
    responseR.id = response.id;

    if (response.is_error() === true && response.result === null) {
      return null;
    }
    if (response.result && typeof response.result === 'string') {
      responseR.result = response.result;
      return responseR;
    }
    return null;
  }
}
export class FilesCreateResponse extends response.JsonrpcBaseResponse {
  result?: string;
  constructor () {
    super('FilesCreate');
  }
}
export class FilesDelete extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, resource: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'Files.Delete';
    this.params = { resource };
  }

  public parse (response: response.JsonrpcBaseResponse): FilesDeleteResponse | null {
    const responseR = new FilesDeleteResponse();
    responseR.error = response.error;
    responseR.id = response.id;
    if ((response.is_error() === true) || (response.result === null)) {
      return null;
    }
    if (response.result) {
      responseR.result = response.result;
      return responseR;
    }
    return null;
  }
}
export class FilesDeleteResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('FilesDelete');
  }
}
export class FilesCreateDirectory extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, resource:string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'Files.CreateDirectory';
    this.params = { resource };
  }

  public parse (response: response.JsonrpcBaseResponse): FilesCreateDirectoryResponse | null {
    const responseR = new FilesCreateDirectoryResponse();
    responseR.error = response.error;
    responseR.id = response.id;
    if ((response.is_error() === true) || (response.result === null)) {
      return null;
    }
    if (response.result) {
      responseR.result = response.result;
      return responseR;
    }
    return null;
  }
}
export class FilesCreateDirectoryResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('FilesCreateDirectory');
  }
}

export class FilesDeleteDirectory extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, resource:string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'Files.DeleteDirectory';
    this.params = { resource };
  }

  public parse (response: response.JsonrpcBaseResponse): FilesDeleteDirectoryResponse | null {
    const responseR = new FilesDeleteDirectoryResponse();
    responseR.error = response.error;
    responseR.id = response.id;
    if ((response.is_error() === true) || (response.result === null)) {
      return null;
    }
    if (response.result) {
      responseR.result = response.result;
      return responseR;
    }
    return null;
  }
}
export class FilesDeleteDirectoryResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('FilesDeleteDirectory');
  }
}

export class FilesRename extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, resource:string, new_resource: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'Files.Rename';
    this.params = { resource, new_resource };
  }

  public parse (response: response.JsonrpcBaseResponse): FilesRenameResponse | null {
    const responseR = new FilesRenameResponse();
    responseR.error = response.error;
    responseR.id = response.id;
    if ((response.is_error() === true) || (response.result === null)) {
      return null;
    }
    if (response.result) {
      responseR.result = response.result;
      return responseR;
    }
    return null;
  }
}

export class FilesRenameResponse extends response.JsonrpcBaseResponse {
  result?: boolean;

  constructor () {
    super('FilesRename');
  }
}

export class Resources {
  name: string = '';
  type: string = '';
  size?: number;
  last_modified: string = '';
  state?: string;

}

export class FilesBrowse extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, resource?:string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'Files.Browse';
    if (resource) {
      this.params = { resource };
    }
  }

  public parse (response: response.JsonrpcBaseResponse): FilesBrowseResponse|null {
    const logger = pino();

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result.resources.length <= 0) {
      logger.error('There are no files');
      return null;
    }

    const container : Resources[] = [];
    const responseR = new FilesBrowseResponse();
    const responseProcess = new FilesBrowseResponse();
    let vars : Resources | null = null;
    responseProcess.result = response.result;
    if (responseProcess.result !== undefined) {

      for (const [key, value] of Object.entries(response.result) as [string, unknown][]) {

        if (typeof key === 'string' && key === 'resources') {
          // Don't create vars here because in the loop it will override the same instance
          if (Array.isArray(value)) {
            for (const content of value) {
              vars = new Resources();
              vars.name = content.name || '';
              vars.type = content.type || '';
              vars.size = Number(content.size) || undefined;
              vars.last_modified = content.last_modified || '';
              vars.state = content.state || undefined;

              if (vars !== null) {
                container.push(vars);
              }

            }
          }

        }
      }

    }

    responseR.error = response.error;
    responseR.id = response.id;
    responseR.result = container;
    return responseR;

  }
}
export class FilesBrowseResponse extends response.JsonrpcBaseResponse {
  result?: Resources[];
  constructor () {
    super('FilesBrowse');
  }
}

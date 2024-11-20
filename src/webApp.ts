import * as request from './request';
import * as response from './response';
import * as pino from 'pino';

export class WebAppCreate extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, name: string, state?: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);
    this.method = 'WebApp.Create';
    if (state) {
      this.params = { name, state };
    } else {
      this.params = { name, state: 'enabled' }; // Default value
    }

  }

  public parse (response: response.JsonrpcBaseResponse): WebAppCreateResponse | null {
    const responseR = new WebAppCreateResponse();
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

export class WebAppCreateResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppCreate');
  }
}
export class WebAppDelete extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, name: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);
    this.method = 'WebApp.Delete';
    this.params = { name };
  }

  public parse (response: response.JsonrpcBaseResponse): WebAppDeleteResponse | null {
    const responseR = new WebAppDeleteResponse();
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
export class WebAppDeleteResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppDelete');
  }
}

export class WebAppRename extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, name: string, new_name: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.Rename';
    this.params = { name, new_name };

  }

  public parse (response: response.JsonrpcBaseResponse): WebAppRenameResponse | null {
    const responseR = new WebAppRenameResponse();
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
export class WebAppRenameResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppRename');
  }
}
export class WebAppRenameResource extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, app_name: string, name: string, new_name: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);
    this.method = 'WebApp.RenameResource';
    this.params = { app_name, name, new_name };
  }

  public parse (response: response.JsonrpcBaseResponse): WebAppRenameResourceResponse | null {
    const responseR = new WebAppRenameResourceResponse();
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
export class WebAppRenameResourceResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppRenameResource');
  }
}
export class WebAppSetState extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, name: string, state: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.SetState';
    this.params = { name, state };

  }

  public parse (response: response.JsonrpcBaseResponse): WebAppSetStateResponse | null {
    const responseR = new WebAppSetStateResponse();
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
export class WebAppSetStateResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppSetState');
  }
}

export class WebAppSetDefaultPage extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, name: string, resource_name: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.SetDefaultPage';
    this.params = { name, resource_name };
  }

  public parse (response: response.JsonrpcBaseResponse): WebAppSetDefaultPageResponse | null {
    const responseR = new WebAppSetDefaultPageResponse();
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
export class WebAppSetDefaultPageResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppSetDefaultPage');
  }
}

export class WebAppSetNotFoundPage extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, name: string, resource_name: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.SetNotFoundPage';
    this.params = { name, resource_name };
  }

  public parse (response: response.JsonrpcBaseResponse): WebAppSetNotFoundPageResponse | null {
    const responseR = new WebAppSetNotFoundPageResponse();
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
export class WebAppSetNotFoundPageResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppSetNotFoundPage');
  }
}

export class WebAppSetNotAuthorizedPage extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, name: string, resource_name: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.SetNotAuthorizedPage';
    this.params = { name, resource_name };
  }

  public parse (response: response.JsonrpcBaseResponse): WebAppSetNotAuthorizedPageResponse | null {
    const responseR = new WebAppSetNotAuthorizedPageResponse();
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
export class WebAppSetNotAuthorizedPageResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppSetNotAuthorizedPage');
  }
}
export class WebAppCreateResource extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, app_name: string, name: string, media_type: string, last_modified: string, visibility?: string, etag?: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.CreateResource';

    if (visibility && etag) {
      this.params = { app_name, name, media_type, visibility, etag, last_modified };
    } else if (visibility && !etag) {
      this.params = { app_name, name, media_type, visibility, etag: '', last_modified };
    } else if (etag && !visibility) {
      this.params = { app_name, name, media_type, visibility: 'public', etag, last_modified };
    } else {
      this.params = { app_name, name, media_type, visibility: 'public', etag: '', last_modified };
    }
  }

  public parse (response: response.JsonrpcBaseResponse): WebAppCreateResourceResponse | null {
    const responseR = new WebAppCreateResourceResponse();
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
export class WebAppCreateResourceResponse extends response.JsonrpcBaseResponse {
  result?: string;
  constructor () {
    super('WebAppCreateResource');
  }
}
export class WebAppDeleteResource extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, app_name: string, name: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.DeleteResource';
    this.params = { app_name, name };

  }

  public parse (response: response.JsonrpcBaseResponse): WebAppDeleteResourceResponse | null {
    const responseR = new WebAppDeleteResourceResponse();
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
export class WebAppDeleteResourceResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppDeleteResource');
  }
}
export class WebAppDownloadResource extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, app_name: string, name: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.DownloadResource';
    this.params = { app_name, name };

  }

  public parse (response: response.JsonrpcBaseResponse): WebAppDownloadResourceResponse | null {
    const responseR = new WebAppDownloadResourceResponse();
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
export class WebAppDownloadResourceResponse extends response.JsonrpcBaseResponse {
  result?: string;
  constructor () {
    super('WebAppDownloadResource');
  }
}

export class WebAppSetResourceETag extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, app_name: string, name: string, etag: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.SetResourceETag';
    this.params = { app_name, name, etag };
  }

  public parse (response: response.JsonrpcBaseResponse): WebAppSetResourceETagResponse | null {
    const responseR = new WebAppSetResourceETagResponse();
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
export class WebAppSetResourceETagResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppSetResourceETag');
  }
}

export class WebAppSetResourceMediaType extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, app_name: string, name: string, media_type: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.SetResourceMediaType';
    this.params = { app_name, name, media_type };
  }

  public parse (response: response.JsonrpcBaseResponse): WebAppSetResourceMediaTypeResponse | null {
    const responseR = new WebAppSetResourceMediaTypeResponse();
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
export class WebAppSetResourceMediaTypeResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppSetResourceMediaType');
  }
}
export class WebAppSetResourceModificationTime extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, app_name: string, name: string, last_modified: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.SetResourceModificationTime';
    this.params = { app_name, name, last_modified };
  }

  public parse (response: response.JsonrpcBaseResponse): WebAppSetResourceModificationTimeResponse | null {
    const responseR = new WebAppSetResourceModificationTimeResponse();
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
export class WebAppSetResourceModificationTimeResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppSetResourceModificationTime');
  }
}

export class WebAppSetResourceVisibility extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, app_name: string, name: string, visibility: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.SetResourceVisibility';
    this.params = { app_name, name, visibility };
  }

  public parse (response: response.JsonrpcBaseResponse): WebAppSetResourceVisibilityResponse | null {
    const responseR = new WebAppSetResourceVisibilityResponse();
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
export class WebAppSetResourceVisibilityResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebAppSetResourceVisibility');
  }
}

export class Application {
  name: string = '';
  state: string = '';
  type: string = '';
}

export class BrowseStructure {
  max_applications: number = 0;
  applications: Application[] = [];
}

export class WebAppBrowse extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, name?: string) {
    super(config.address, config.protocol, config.verifyTls);

    this.method = 'WebApp.Browse';
    if (name) {
      this.params = { name };
    }
  }

  public parse (response: response.JsonrpcBaseResponse): WebAppBrowseResponse | null {
    const logger = pino.pino();
    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result.applications === undefined) {
      console.log('An application with this name does not exist.');
      logger.error('An application with this name does not exist.');
      return null;
    }

    let container: BrowseStructure = new BrowseStructure();
    const responseR = new WebAppBrowseResponse();
    const responseProcess = new WebAppBrowseResponse();
    let Var : BrowseStructure | null = null;
    responseProcess.result = response.result;

    if (responseProcess.result !== undefined) {
      for (const [key, value] of Object.entries(responseProcess.result) as [string, unknown][]) {

        if (typeof key === 'string' && key === 'max_applications') {
          Var = new BrowseStructure();
          Var.max_applications = Number(value) || 0;
        // I only create the instance when I find max_applications because it only appears once!
        // Necessary to check if in key there is an string.
        } else if (key === 'applications' && Var !== null) {
          if (Array.isArray(value)) {
            for (const content of value) {
              const app = new Application();
              app.name = content.name || '';
              app.state = content.state || '';
              app.type = content.type || '';

              Var.applications.push(app);
            }
          }
        }
      }
      if (Var !== null) {
        container = Var;
      }
    }
    responseR.error = response.error;
    responseR.id = response.id;
    responseR.result = container;
    return responseR;
  }
}
export class WebAppBrowseResponse extends response.JsonrpcBaseResponse {
  result?: BrowseStructure;
  constructor () {
    super('WebAppBrowse');
  }
}

export class Resource {
  name: string = '';
  size: number = 0;
  media_type : string = '';
  etag ?: string;
  visibility: string = '';
  last_modified: string = '';
}
export class BrowseResourcesStructure {
  max_resources : number = 0;
  resources : Resource[] = [];
}
export class WebAppBrowseResources extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, app_name: string, name?: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebApp.BrowseResources';
    if (name !== undefined) {
      this.params = { app_name, name };
    } else {
      this.params = { app_name };
    }
  }

  public parse (response: response.JsonrpcBaseResponse): WebAppBrowseResourcesResponse | null {
    const logger = pino.pino();
    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result.resources.length <= 0) {
      console.log('An application with this name does not exist.');
      logger.error('An application with this name does not exist.');
      return null;
    }

    let container: BrowseResourcesStructure = new BrowseResourcesStructure();
    const responseR = new WebAppBrowseResourcesResponse();
    const responseProcess = new WebAppBrowseResourcesResponse();
    let Var : BrowseResourcesStructure | null = null;
    responseProcess.result = response.result;

    if (responseProcess.result !== undefined) {
      for (const [key, value] of Object.entries(responseProcess.result) as [string, unknown][]) {

        if (typeof key === 'string' && key === 'max_resources') {
          if (Var == null) {
            Var = new BrowseResourcesStructure();
          }
          // I only create the instance when I find max_applications because it only appears once!
          // Necessary to check if in key there is an string.
          Var.max_resources = Number(value) || 0;

        } else if (key === 'resources' && Var !== null) {
          if (Array.isArray(value)) {
            for (const content of value) {
              const resource = new Resource();
              resource.name = content.name || '';
              resource.size = content.size || 0;
              resource.media_type = content.media_type || '';
              resource.etag = content.etag || undefined;
              resource.visibility = content.visibility || '';
              resource.last_modified = content.last_modified || '';

              Var.resources.push(resource);

            }
          }
        }
      }
      if (Var !== null) {
        container = Var;
      }
    }
    responseR.error = response.error;
    responseR.id = response.id;
    responseR.result = container;
    return responseR;
  }

}

export class WebAppBrowseResourcesResponse extends response.JsonrpcBaseResponse {
  result?: BrowseResourcesStructure;
  constructor () {
    super('WebAppBrowseResources');
  }
}

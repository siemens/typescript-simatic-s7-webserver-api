import * as response from './response';
import * as request from './request';
import * as pino from 'pino';

export class WebServerSetDefaultPage extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, default_page: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebServer.SetDefaultPage';
    this.params = { default_page };
  }

  public parse (response: response.JsonrpcBaseResponse): WebServerSetDefaultPageResponse | null {
    const logger = pino.pino();
    logger.level = 'debug';
    //     transport: {
    //         target: 'pino-pretty',
    //         options: {}
    //     }
    // });

    const responseR = new WebServerSetDefaultPageResponse();

    responseR.error = response.error;
    responseR.id = response.id;
    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result) {
      responseR.result = response.result;
      return responseR;
    }
    return null;

  }
}
export class WebServerSetDefaultPageResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebServerSetDefaultPage');
  }
}

export class WebServerReadDefaultPage extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig) {
    super(config.address, config.protocol, config.verifyTls);

    this.method = 'WebServer.ReadDefaultPage';
  }

  public parse (response: response.JsonrpcBaseResponse): WebServerReadDefaultPageResponse | null {
    // const logger =  pino.pino({
    //     level: 'debug',
    //     transport:{
    //         target: 'pino-pretty'
    //     }
    // });
    const logger = pino.pino();
    logger.level = 'debug';

    const responseR = new WebServerReadDefaultPageResponse();

    responseR.error = response.error;
    responseR.id = response.id;

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result && typeof response.result.default_page === 'string') {
      responseR.result = response.result.default_page;
      return responseR;
    }
    return null;
  }

}

export class WebServerReadDefaultPageResponse extends response.JsonrpcBaseResponse {
  result?: string;

  constructor () {
    super('WebServerReadDefaultPageResponse');
  }
}


export class WebServerReadResponseHeaders extends request.JsonrpcBaseRequest {
  constructor(config: request.RequestConfig, token: string){
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebServer.ReadResponseHeaders'
  }

  public parse(response: response.JsonrpcBaseResponse): WebServerReadResponseHeadersResponse | null {
    const logger = pino.pino();
    logger.level = 'debug';

    const responseR = new WebServerReadResponseHeadersResponse();

    responseR.error = response.error;
    responseR.id = response.id;

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }

    const res: any = response.result;

    if (!res || !Array.isArray(res.configured_headers) || !Array.isArray(res.allowed_headers)) {
      logger.error('Response result missing required arrays: configured_headers or allowed_headers');
      return null;
    }

    const headers = new HeadersResponse();

    for (const ch of res.configured_headers) {
      if (ch && typeof ch.pattern === 'string' && typeof ch.header === 'string') {
        const item = new WebServer_ReadResponseHeaders_Configured_Response();
        item.pattern = ch.pattern;
        item.header = ch.header;
        headers.configured_headers.push(item);
      } else {
        logger.debug('Skipping invalid configured_headers entry', { entry: ch });
      }
    }

    for (const ah of res.allowed_headers) {
      if (ah && typeof ah.pattern === 'string' && typeof ah.key === 'string') {
        const item = new WebServer_ReadResponseHeaders_Allowed_Response();
        item.pattern = ah.pattern;
        item.key = ah.key;
        headers.allowed_headers.push(item);
      } else {
        logger.debug('Skipping invalid allowed_headers entry', { entry: ah });
      }
    }

    responseR.result = headers;
    return responseR;
  }
}

export class WebServerReadResponseHeadersResponse extends response.JsonrpcBaseResponse {
  result?: HeadersResponse;

  constructor() {
    super('WebServerReadResponseHeaders');
  }
}

export class HeadersResponse {
  configured_headers : WebServer_ReadResponseHeaders_Configured_Response[] = [];
  allowed_headers: WebServer_ReadResponseHeaders_Allowed_Response[] = [];

}

class WebServer_ReadResponseHeaders_Configured_Response {
  pattern : string = '';
  header : string = '';
}

class WebServer_ReadResponseHeaders_Allowed_Response {
  pattern : string = '';
  key : string = '';
}

export class WebServerChangeResponseHeaders extends request.JsonrpcBaseRequest {
  constructor(config: request.RequestConfig, token: string, pattern : string, header : string){
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'WebServer.ChangeResponseHeaders';
    this.params = { 
      headers: [{ pattern, header }]
    };
  }

  public parse(response: response.JsonrpcBaseResponse): WebServerChangeResponseHeadersResponse | null {
    const logger = pino.pino();
    logger.level = 'debug';
    //     transport: {
    //         target: 'pino-pretty',
    //         options: {}
    //     }
    // });

    const responseR = new WebServerChangeResponseHeadersResponse();

    responseR.error = response.error;
    responseR.id = response.id;
    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result) {
      responseR.result = response.result;
      return responseR;
    }
    return null;
  }
}

export class WebServerChangeResponseHeadersResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('WebServerChangeResponseHeaders');
  }
}
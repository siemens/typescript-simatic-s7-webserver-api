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

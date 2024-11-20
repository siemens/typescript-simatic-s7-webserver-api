import * as response from './response';
import * as request from './request';

export class DataLogsDownloadAndClear extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, resource: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'DataLogs.DownloadAndClear';
    this.params = { resource };
  }

  public parse (response: response.JsonrpcBaseResponse): DataLogsDownloadAndClearResponse | null {
    const responseR = new DataLogsDownloadAndClearResponse();
    responseR.error = response.error;
    responseR.id = response.id;

    if ((response.is_error() === true) || (response.result === null)) {
      return null;
    }
    if (response.result && typeof response.result === 'string') {

      responseR.result = response.result;
      return responseR;
    }
    return null;
  }
}

export class DataLogsDownloadAndClearResponse extends response.JsonrpcBaseResponse {
  result?: string;
  constructor () {
    super('DataLogsDownloadAndClear');
  }
}

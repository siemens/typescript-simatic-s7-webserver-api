import * as pino from 'pino';
import * as request from './request';
import * as response from './response';

export class SyslogData {
  raw: string = '';
}
export class SyslogBrowseStructure {
  entries: SyslogData[] = [];
  count_total: number = 0;
  count_lost: number = 0;
}
export class SyslogBrowse extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, redundancy_id?: number, count?: number, first?: number) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);
    this.method = 'Syslog.Browse';
    this.params = {};
    if (redundancy_id !== undefined) {
      this.params.redundancy_id = redundancy_id;
    }

    if (count !== undefined) {
      this.params.count = count;
    }
    if (first !== undefined) {
      this.params.first = first;
    }
  }

  public parse (response: response.JsonrpcBaseResponse): SyslogBrowseResponse | null {

    const logger = pino.pino();

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }

    const responseProcess = new SyslogBrowseResponse();
    const responseR = new SyslogBrowseResponse();
    let container : SyslogBrowseStructure = new SyslogBrowseStructure();
    let Vars: SyslogBrowseStructure | null = null;
    responseProcess.result = response.result;
    if (responseProcess.result !== undefined) {

      Vars = new SyslogBrowseStructure();
      for (const [key, value] of Object.entries(response.result) as [string, any]) { // Only returns a Record, not an array of arrays

        if (Vars !== null) {
          if (key === 'count_total') {
            Vars.count_total = Number(value) || 0;
          }
          if (key === 'count_lost') {
            Vars.count_lost = Number(value) || 0;
          }
          if (key === 'entries') {
            for (const content of value) {
              const entry = new SyslogData();
              entry.raw = content || '';
              Vars.entries.push(entry);
            }

          }

        }
      }
      if (Vars !== null) {
        container = Vars;
      }
    }
    responseR.error = response.error;
    responseR.id = response.id;
    responseR.result = container;
    return responseR;
  }
}

export class SyslogBrowseResponse extends response.JsonrpcBaseResponse {
  result?: SyslogBrowseStructure;
  constructor () {
    super('SyslogBrowse');
  }
}


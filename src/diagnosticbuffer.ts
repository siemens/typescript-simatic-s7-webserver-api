import * as request from './request';
import * as response from './response';
import pino from 'pino';

export class Filters {
  mode: string = '';
  attributes: string[] = [];
}
export class Event {
  textlist_id: number = 0;
  text_id: number = 0;

}
export class Entry {
  timestamp: string = '';
  status: string = '';
  long_text: string = '';
  short_text: string = '';
  help_text: string = '';
  event: Event = new Event();
}

export class DiagnosticBufferStructure {
  last_modified: string = '';
  count_current: number = 0;
  count_max: number = 0;
  language?: string;
  entries?: Entry[];
}
export class DiagnosticBufferBrowse extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, language: string, count?: number, filters?: Filters) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'DiagnosticBuffer.Browse';
    this.params = { language };

    // Different way to check if the properties are defined, if is present, it will add it at the end of the object.
    if (count !== undefined) {
      this.params.count = count;
    }
    if (filters !== undefined) {
      this.params.filters = { mode: filters.mode, attributes: filters.attributes };
    }
  }

  public parse (response: response.JsonrpcBaseResponse): DiagnosticBufferBrowseResponse | null {
    const logger = pino();

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (!response.result.entries) {
      logger.info('There are no entries');

    }
    let container: DiagnosticBufferStructure = new DiagnosticBufferStructure();
    const responseR = new DiagnosticBufferBrowseResponse();
    const responseProcess = new DiagnosticBufferBrowseResponse();
    let Var : DiagnosticBufferStructure | null = null;

    responseProcess.result = response.result;

    if (responseProcess.result !== undefined) {
      Var = new DiagnosticBufferStructure();
      for (const [key, value] of Object.entries(responseProcess.result) as [string, any][]) {
        if (typeof key === 'string') {

          if (key === 'last_modified') {
            Var.last_modified = value || '';
          }
          if (key === 'count_current') {
            Var.count_current = Number(value) || 0;
          }
          if (key === 'count_max') {
            Var.count_max = Number(value) || 0;
          }
          if (key === 'language') {
            Var.language = value || undefined;
          }

          if (key === 'entries') {
            Var.entries = [];
            for (const content of value) {
              const entry = new Entry();

              entry.timestamp = content.timestamp || '';
              entry.status = content.status || '';
              entry.long_text = content.long_text || '';
              entry.short_text = content.short_text || '';
              entry.help_text = content.help_text || '';

              if ('event' in content) {
                entry.event = new Event();
                entry.event.textlist_id = Number(content.event.textlist_id) || 0;
                entry.event.text_id = Number(content.event.text_id) || 0;

              }
              Var.entries?.push(entry);
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

export class DiagnosticBufferBrowseResponse extends response.JsonrpcBaseResponse {
  result?: DiagnosticBufferStructure;
  constructor () {
    super('DiagnosticBufferBrowse');
  }
}

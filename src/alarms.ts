import * as request from './request';
import { JsonrpcBaseResponse } from './response';
import pino from 'pino';

export class Filters {
  mode: string = '';
  attributes: string[] = [];
}
export class Acknowledgement {
  state: string = '';
  timestamp: string = '';

}
export class EntryAlarm {
  id: string = '';
  alarm_number: number = 0;
  status: string = '';
  timestamp: string = '';
  producer: string = '';
  hwid?: number;
  acknowledgement?: Acknowledgement;
  alarm_text: string = '';
  info_text: string = '';
  text_inconsistent ?: boolean;
}
export class Alarms {
  language ?: string;
  last_modified: string = '';
  count_current: number = 0;
  count_max: number = 0;
  entries?: EntryAlarm[];
}
export class AlarmsBrowse extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, language: string, count?: number, alarm_id?: string, filters ?: Filters) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'Alarms.Browse';
    this.params = { language };

    // Different way to check if the properties are defined, if is present, it will add it at the end of the object.
    if (count !== undefined) {
      this.params.count = count;
    }
    if (alarm_id !== undefined) {
      this.params.alarm_id = alarm_id;
    }
    if (filters !== undefined) {
      this.params.filters = { mode: filters.mode, attributes: filters.attributes };
    }
  }

  public parse (response: JsonrpcBaseResponse): AlarmsBrowseResponse | null {
    const logger = pino();

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result.entries.length <= 0) {
      logger.error('There are no entries');

    }
    let container: Alarms = new Alarms();
    const responseR = new AlarmsBrowseResponse();
    const responseProcess = new AlarmsBrowseResponse();
    let Var : Alarms | null = null;

    responseProcess.result = response.result;

    if (responseProcess.result !== undefined) {

      Var = new Alarms();
      for (const [key, value] of Object.entries(responseProcess.result) as [string, any][]) {
        if (typeof key === 'string') {

          // IF for each one like, if not you will overwerite properties:
          if (key === 'language') {
            Var.language = value || undefined;
          }
          if (key === 'last_modified') {
            Var.last_modified = value || '';
          }
          if (key === 'count_current') {
            Var.count_current = Number(value) || 0;
          }
          if (key === 'count_max') {
            Var.count_max = Number(value) || 0;
          }

          if (key === 'entries') {
            Var.entries = [];
            for (const content of value) {

              if (Array.isArray(value)) {

                const entry = new EntryAlarm();

                entry.id = content.id || '';
                entry.alarm_number = Number(content.alarm_number) || 0;
                entry.status = content.status || '';
                entry.timestamp = content.timestamp || '';
                entry.producer = content.producer || '';
                entry.hwid = Number(content.hwid) || undefined;

                if ('acknowledgement' in content) {
                  entry.acknowledgement = new Acknowledgement();

                  entry.acknowledgement.state = content.acknowledgement.state || '';
                  entry.acknowledgement.timestamp = content.acknowledgement.timestamp || '';
                }

                entry.alarm_text = content.alarm_text || '';
                entry.info_text = content.info_text || '';
                entry.text_inconsistent = Boolean(content.text_incosistent) || undefined;

                Var.entries?.push(entry);
              }
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

export class AlarmsBrowseResponse extends JsonrpcBaseResponse {
  result?: Alarms;
  constructor () {
    super('AlarmsBrowse');
  }
}

export class AlarmsAcknowledge extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, id: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'Alarms.Acknowledge';
    this.params = { id };
  }

  public parse (response: JsonrpcBaseResponse):AlarmsAcknowledgeResponse | null {
    const responseR = new AlarmsAcknowledgeResponse();
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

export class AlarmsAcknowledgeResponse extends JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('AlarmsAcknowledge');
  }
}

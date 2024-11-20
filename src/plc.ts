
import * as request from './request';
import * as response from './response';
import * as pino from 'pino';

export enum PlcOpertingMode {
    STOP = 'stop',
    STARTUP = 'startup',
    RUN = 'run',
    HOLD = 'hold',
    UNKNOWN = ''
}

export function obtainEnumValue<T extends Record<string, unknown>> (
  enumObj: T,
  value: keyof T
): T[keyof T] | undefined {

  // Is done in this way to extend that response.result is a record and not directly a string, so the keyof T is an STRING, and the return is from T[string] or undefined.

  const stringValue = value.toString(); // Necessary to convert first in a String to be able to use UpperCase function.
  const upperCaseValue = stringValue.toUpperCase()as unknown as keyof T;

  return enumObj[upperCaseValue] as T[keyof T] | undefined;

}
export class PlcReadOperatingMode extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string) {
    const method = 'Plc.ReadOperatingMode';

    super(config.address, config.protocol, config.verifyTls, method, undefined, token);
  }

  public parse (response: response.JsonrpcBaseResponse): PlcReadOperatingModeResponse | null {
    const responseR = new PlcReadOperatingModeResponse();

    responseR.id = response.id;
    responseR.error = response.error;

    if (response.is_error() || response.result === null) {
      return null;
    }
    if (response.result?.length === 0) {
      return null;
    }
    if (response.result !== undefined) {

      responseR.result = obtainEnumValue(PlcOpertingMode, response.result as unknown as keyof typeof PlcOpertingMode); // necessary unknown first to convert the result in the keyof the typeof PlcOperatingMode
      obtainEnumValue(PlcOpertingMode, response.result);
    }
    return responseR;
  }
}
export class PlcReadOperatingModeResponse extends response.JsonrpcBaseResponse {
  result?: string;
  constructor () {
    super('PlcReadOperatingMode');
  }
}

export class PlcRequestChangeOperatingMode extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, mode: PlcOpertingMode) {
    const method = 'Plc.RequestChangeOperatingMode';
    let modefunc;
    if (mode === PlcOpertingMode.STARTUP || mode === PlcOpertingMode.HOLD) {
      throw new Error('Mode for mode change my only be Start or Stop');
    } else {
      modefunc = { mode: mode.valueOf() };
    }

    super(config.address, config.protocol, config.verifyTls, method, modefunc, token);

  }

  public parse (response: response.JsonrpcBaseResponse): PlcRequestChangeOperatingModeResponse | null {
    const responseR = new PlcRequestChangeOperatingModeResponse();
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
export class PlcRequestChangeOperatingModeResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('PlcRequestChangeOperatingMode');
  }
}
export class PlcReadSystemTime extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig) {
    const method = 'Plc.ReadSystemTime';

    super(config.address, config.protocol, config.verifyTls, method);
  }

  public parse (response: response.JsonrpcBaseResponse): PlcReadSystemTimeResponse | null {
    const responseR = new PlcReadSystemTimeResponse();
    responseR.id = response.id;
    responseR.error = response.error;
    if (response.is_error() || !response.result || !('timestamp' in response.result)) {
      return null;
    }

    const timestampStr: string = response.result.timestamp;
    const [datePart, msPart] = timestampStr.split('.');
    const timestamp: Date = new Date(datePart);
    const ms: number = 1 / parseFloat(msPart.replace('Z', '')) * 1000; // This is because at the end of the ms there is a z

    responseR.result = new Date(timestamp.getTime() + ms);
    return responseR; // No change between timeStamp and timeStamp + ms

  }
}

export class PlcReadSystemTimeResponse extends response.JsonrpcBaseResponse {
  result?: Date;
  constructor () {
    super('PlcReadSystemTime');
  }
}

export class PlcSetSystemTime extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, timestamp: string) {

    super(config.address, config.protocol, config.verifyTls);
    this.token = token;
    this.method = 'Plc.SetSystemTime';
    this.params = { timestamp };
  }

  public parse (response: response.JsonrpcBaseResponse): PlcSetSystemTimeResponse | null {
    const responseR = new PlcSetSystemTimeResponse();
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

export class PlcSetSystemTimeResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('PlcSetSystemTime');
  }
}

export class RuleStart {
  month: number = 0;
  week: number = 0;
  day_of_week: string = '';
  hour: number = 0;
  minute: number = 0;
}
export class RuleStd {
  start: RuleStart = new RuleStart();
}

export class RuleDst {
  start: RuleStart = new RuleStart();
  offset: string = '';
}
export class Rule {
  ruleStd: RuleStd = new RuleStd();
  ruleDst: RuleDst = new RuleDst();
}
export class TimeSettings {
  current_offset: string = '';
  utc_offset: string = '';
  rule?: Rule;
}

export class PlcReadTimeSettings extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig) {
    super(config.address, config.protocol, config.verifyTls);
    this.method = 'Plc.ReadTimeSettings';
  }

  public parse (response: response.JsonrpcBaseResponse): PlcReadTimeSettingsResponse | null {
    const logger = pino.pino();

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result.length <= 0) {
      logger.error('There are no time settings');
      return null;
    }
    const container: TimeSettings[] = [];
    const responseR = new PlcReadTimeSettingsResponse();
    const responseProcess = new PlcReadTimeSettingsResponse();
    let Var : TimeSettings | null = null;
    responseProcess.result = response.result;

    if (responseProcess.result !== undefined) {
      if (Var == null) {
        Var = new TimeSettings();
      }
      for (const [key, value] of Object.entries(responseProcess.result) as [string, any]) {
        if (Var !== null) {
          if (key === 'current_offset') {
            Var.current_offset = value || '';
          }
          if (key === 'utc_offset') {
            Var.utc_offset = value || '';
          }
          if (key === 'rule') {
            Var.rule = new Rule();
            if ('dst' in value) { // value is an object not an string, not possible to do value == 'dst'
              Var.rule.ruleDst = new RuleDst();
              Var.rule.ruleDst.offset = value.dst.offset || '';
              if ('start' in value.dst) { // same case, start is an object inside dst
                Var.rule.ruleDst.start = new RuleStart();
                Var.rule.ruleDst.start.month = Number(value.dst.start.month) || 0;
                Var.rule.ruleDst.start.week = Number(value.dst.start.week) || 0;
                Var.rule.ruleDst.start.day_of_week = value.dst.start.day_of_week || '';
                Var.rule.ruleDst.start.hour = Number(value.dst.start.hour) || 0;
                Var.rule.ruleDst.start.minute = Number(value.dst.start.minute) || 0;
              }
            }
            if ('std' in value) {
              Var.rule.ruleStd = new RuleStd();
              if ('start' in value.std) {
                Var.rule.ruleStd.start = new RuleStart();
                Var.rule.ruleStd.start.month = Number(value.std.start.month) || 0;
                Var.rule.ruleStd.start.week = Number(value.std.start.week) || 0;
                Var.rule.ruleStd.start.day_of_week = value.std.start.day_of_week || '';
                Var.rule.ruleStd.start.hour = Number(value.std.start.hour) || 0;
                Var.rule.ruleStd.start.minute = Number(value.std.start.minute) || 0;
              }
            }
          }
          container.push(Var);
        }

      }

    }
    responseR.error = response.error;
    responseR.id = response.id;
    responseR.result = container;
    return responseR;
  }
}
export class PlcReadTimeSettingsResponse extends response.JsonrpcBaseResponse {
  result?: TimeSettings[];
  constructor () {
    super('PlcReadTimeSettings');
  }
}
export class PlcSetTimeSettings extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, TimeSettings: TimeSettings) {

    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'Plc.SetTimeSettings';
    this.params = {};
    if (!(TimeSettings.rule)) {
      this.params = { utc_offset: TimeSettings.utc_offset }; // There is no Setting for current_offset

    } else {
      if (!this.params.rule) {
        this.params.rule = {};
      }

      if (!this.params.rule.dst) {
        this.params.rule.dst = {};
      }

      if (!this.params.rule.dst.start) {
        this.params.rule.dst.start = {};
      }
      if (!this.params.rule.std) {
        this.params.rule.std = {};
      }

      if (!this.params.rule.std.start) {
        this.params.rule.std.start = {};
      } // Must initialice empty objects before writing the properties.
      this.params.utc_offset = TimeSettings.utc_offset;
      this.params.rule.dst = {
        offset: TimeSettings.rule.ruleDst.offset,
        start: {
          month: TimeSettings.rule.ruleDst.start.month,
          week: TimeSettings.rule.ruleDst.start.week,
          day_of_week: TimeSettings.rule.ruleDst.start.day_of_week,
          hour: TimeSettings.rule.ruleDst.start.hour,
          minute: TimeSettings.rule.ruleDst.start.minute
        }
      };
      this.params.rule.std.start = {
        month: TimeSettings.rule.ruleStd.start.month,
        week: TimeSettings.rule.ruleStd.start.week,
        day_of_week: TimeSettings.rule.ruleStd.start.day_of_week,
        hour: TimeSettings.rule.ruleStd.start.hour,
        minute: TimeSettings.rule.ruleStd.start.minute
      };
    }

  }

  public parse (response: response.JsonrpcBaseResponse): PlcSetTimeSettingsResponse | null {
    const responseR = new PlcSetTimeSettingsResponse();
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
export class PlcSetTimeSettingsResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('PlcSetTimeSettings');
  }
}
export class PlcCreateBackup extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string) {

    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);
    this.method = 'Plc.CreateBackup';
  }

  public parse (response: response.JsonrpcBaseResponse): PlcCreateBackupResponse | null {
    const responseR = new PlcCreateBackupResponse();
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
export class PlcCreateBackupResponse extends response.JsonrpcBaseResponse {
  result?: string;
  constructor () {
    super('PlcCreateBackup');
  }
}
export class PlcRestoreBackup extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, password: string) {

    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);
    this.method = 'Plc.RestoreBackup';
    this.params = { password };
  }

  public parse (response: response.JsonrpcBaseResponse): PlcRestoreBackupResponse | null {
    const responseR = new PlcCreateBackupResponse();
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
export class PlcRestoreBackupResponse extends response.JsonrpcBaseResponse {
  result?: string;
  constructor () {
    super('PlcRestoreBackup');
  }
}

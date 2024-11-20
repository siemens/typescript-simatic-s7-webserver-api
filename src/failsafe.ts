import * as request from './request';
import * as response from './response';
import pino from 'pino';

export class FailsafeReadRuntimeGroupsStructure {
  name: string = '';
  signature: string = '';
  cycle_time_current: string = '';
  cycle_time_max: string = '';
  runtime_current: string = '';
  runtime_max: string = '';
}
export class FailsafeReadRuntimeGroups extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);
    this.method = 'Failsafe.ReadRuntimeGroups';
  }

  public parse (response: response.JsonrpcBaseResponse): FailsafeReadRuntimeGroupsResponse| null {
    const logger = pino({
      // transport: {
      //     target: 'pino-pretty',
      //     options: {}
      // }
    });

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result.groups.length <= 0) {
      logger.error('There are no F-runtime groups');
      return null;
    }

    const container: FailsafeReadRuntimeGroupsStructure[] = [];
    const responseR = new FailsafeReadRuntimeGroupsResponse();
    const responseProcess = new FailsafeReadRuntimeGroupsResponse();
    let Var : FailsafeReadRuntimeGroupsStructure | null = null;

    responseProcess.result = response.result;

    if (responseProcess.result !== undefined && 'groups' in responseProcess.result) {
      const groups = responseProcess.result.groups as FailsafeReadRuntimeGroupsStructure[];

      for (const group of groups) {
        Var = new FailsafeReadRuntimeGroupsStructure();
        Var.name = group.name;
        Var.signature = group.signature;
        Var.cycle_time_current = group.cycle_time_current;
        Var.cycle_time_max = group.cycle_time_max;
        Var.runtime_current = group.runtime_current;
        Var.runtime_max = group.runtime_max;

        container.push(Var);
      }
    }
    responseR.error = response.error;
    responseR.id = response.id;
    responseR.result = container;
    return responseR;
  }
}

export class FailsafeReadRuntimeGroupsResponse extends response.JsonrpcBaseResponse {
  result?: FailsafeReadRuntimeGroupsStructure[];
  constructor () {
    super('FailsafeReadRuntimeGroups');
  }
}
export class CPUResponse {
  last_f_program_modification: string = '';
  collective_signature: string = '';
  remaining_time?: string;
}

export class ModuleResponse {
  f_monitoring_time: number = 0;
  f_source_address: number = 0;
  f_destination_address: number = 0;
  f_par_crc: number[] = [];
}
export class FailsafeReadParametersStructure {
  safety_mode?: string;
  type: string = '';
  parameters?: CPUResponse | ModuleResponse;
}
export class FailsafeReadParameters extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, hwid: number) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);

    this.method = 'Failsafe.ReadParameters';
    this.params = { hwid };
  }

  public parse (response: response.JsonrpcBaseResponse): FailsafeReadParametersResponse | null {
    const logger = pino();

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }

    let container: FailsafeReadParametersStructure = new FailsafeReadParametersStructure();
    const responseR = new FailsafeReadParametersResponse();
    const responseProcess = new FailsafeReadParametersResponse();
    let Var : FailsafeReadParametersStructure | null = null;

    responseProcess.result = response.result;

    if (responseProcess.result !== undefined) {
      for (const [key, value] of Object.entries(responseProcess.result) as [string, any][]) {

        if (typeof key === 'string') {
          if (key === 'type') {
            Var = new FailsafeReadParametersStructure();
            Var.type = value || '';
          }
          if (key === 'safety_mode' && Var !== null) {
            Var.safety_mode = value || undefined;
          }

          if (key === 'parameters' && Var !== null) {

            if (Var.type === 'f_cpu') { // HWID FOR CPU IS THE LOCAL ONE
              Var.parameters = new CPUResponse();

              Var.parameters.last_f_program_modification = value.last_f_program_modification || '';
              Var.parameters.collective_signature = value.collective_signature || '';
              Var.parameters.remaining_time = value.remaining_time || undefined;

            }
            if (Var.type === 'f_module') {
              Var.parameters = new ModuleResponse();

              Var.parameters.f_monitoring_time = Number(value.f_monitoring_time) || 0;
              Var.parameters.f_source_address = Number(value.f_source_address) || 0;
              Var.parameters.f_destination_address = Number(value.f_destination_address) || 0;
              Var.parameters.f_par_crc = Array(value.f_par_crc) || [];

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

export class FailsafeReadParametersResponse extends response.JsonrpcBaseResponse {
  result?: FailsafeReadParametersStructure;
  constructor () {
    super('FailsafeReadParameters');
  }
}


import * as response from './response';
import * as request from './request';

export class PlcProgramBrowseArrayData {
  start_index : number = 0;
  count: number = 0;

}

export class PlcProgramBrowseVariable {
  name : string = '';
  address ?: string;
  read_only ?: boolean;
  has_children ?: boolean;
  db_number ?: number;
  area ?: string;
  datatype : string = '';
  max_length ?: number;
  array_dimensions ?: PlcProgramBrowseArrayData;
  block_number ?: number;
  block_type ?: string;

}

export class PlcProgramBrowse extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, mode: string, Var?: string, type?: string[]) {
    const method = 'PlcProgram.Browse';
    let params = {};
    if (Var !== undefined) {
      params = { var: Var, mode };
    } else {
      if (type !== undefined) {
        params = { mode, type };
      }
      params = { mode };
    }

    // reading the examples that if there is Var there is no type.

    super(config.address, config.protocol, config.verifyTls, method, params, token);

  }

  public parse (response: response.JsonrpcBaseResponse): PlcProgramBrowseResponse|null {
    if (response.is_error() || response.result === null) {
      return null;
    }
    if (response.result?.length === 0) {
      return null;
    }

    const container : PlcProgramBrowseVariable[] = [];
    const responseR = new PlcProgramBrowseResponse();
    const responseProcess = new PlcProgramBrowseResponse();
    let Vars: PlcProgramBrowseVariable | null = null;

    responseProcess.result = response.result;
    if (responseProcess.result !== undefined) {

      for (const value of Object.values(response.result)as [string, any]) { // Only returns a Record, not an array of arrays

        Vars = new PlcProgramBrowseVariable();
        if (Vars !== null) {
          Vars.name = value.name || '';
          Vars.address = value.address || undefined;
          Vars.read_only = Boolean(value.read_only) || undefined;
          Vars.has_children = Boolean(value.db_number) || undefined;
          Vars.area = value.area || undefined;
          Vars.datatype = value.datatype || '';
          Vars.max_length = Number(value.max_length) || undefined;

          if (value === 'array_dimensions') {
            Vars.array_dimensions = new PlcProgramBrowseArrayData();
            Vars.array_dimensions.start_index = Number(value.array_dimensions.start_index) || 0;
            Vars.array_dimensions.count = Number(value.array_dimensions.count) || 0;

          }
          Vars.block_number = Number(value.block_number) || 0;
          Vars.block_type = value.block_type || undefined;
          container.push(Vars);
        }
      }

    }
    responseR.error = response.error;
    responseR.id = response.id;
    responseR.result = container;
    return responseR;
  }
}
export class PlcProgramBrowseResponse extends response.JsonrpcBaseResponse {
  result?: PlcProgramBrowseVariable[];
  constructor () {
    super('PlcProgramBrowse');
  }

}
export class PlcProgramDownloadProfilingData extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string) {
    const method = 'PlcProgram.DownloadProfilingData';

    super(config.address, config.protocol, config.verifyTls, method, undefined, token);
  }

  public parse (response: response.JsonrpcBaseResponse): PlcProgramDownloadProfilingDataResponse | null {
    const responseR = new PlcProgramDownloadProfilingDataResponse();
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
  /* File name
                The file name for downloading the runtime data to a web browser is structured as follows:
                [project_name]_[module_name]_YYYY-MM-DD_HH-mm-ss_profiling.bin
                Example: [1500_example01]_[plc_1]_2023-11-03_12-20-05_profiling.bin
                The file name is returned as an HTTP Content-Disposition header in the server response. */
}

export class PlcProgramDownloadProfilingDataResponse extends response.JsonrpcBaseResponse {
  result?: string;
  constructor () {
    super('PlcProgramDownloadProfilingData');
  }
}
export class PlcProgramRead extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, Var: string, mode: string = 'simple') {
    const method = 'PlcProgram.Read';
    const params = { var: Var, mode };
    super(config.address, config.protocol, config.verifyTls, method, params, token);
  }

  public parse (response: response.JsonrpcBaseResponse): PlcProgramReadResponse | null {
    const responseR = new PlcProgramReadResponse();
    responseR.error = response.error;
    responseR.id = response.id;

    if ((response.is_error() === true) || (response.result === null)) {
      return null;
    }
    if (response) { // Don't check response.result because if it is a false boolean it returns false
      responseR.result = response.result;
      return responseR;
    }
    return null;
  }
}
export class PlcProgramReadResponse extends response.JsonrpcBaseResponse {
  result?: any; // any because it depends on the data type of the tag, it can be an array, a string, an int...
  constructor () {
    super('PlcProgramRead');
  }
}

export class PlcProgramWrite extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, Var: string, value: unknown, mode: string = 'simple') {
    const method = 'PlcProgram.Write';
    const params = { var: Var, value, mode };

    super(config.address, config.protocol, config.verifyTls, method, params, token);
  }

  public parse (response: response.JsonrpcBaseResponse): PlcProgramWriteResponse | null {
    const responseR = new PlcProgramWriteResponse();
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
export class PlcProgramWriteResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('PlcProgramWrite');
  }
}


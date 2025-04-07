import * as response from './response';
import * as request from './request';
import pino from 'pino';

export enum ApiTicketState {
    CREATED = 'created',
    ACTIVE = 'active',
    COMPLETED = 'completed',
    FAILED = 'failed'
}

export class ApiLogin extends request.JsonrpcBaseRequest {

  constructor (config: request.RequestConfig, user: string = 'Anonymous', password: string = '', include_web_application_cookie?: boolean) {
    const method = 'Api.Login';
    const params = { user, password, include_web_application_cookie };

    super(config.address, config.protocol, config.verifyTls, method, params);
  }

  public parse (response: response.JsonrpcBaseResponse): ApiLoginResponse | null {
    const responseR = new ApiLoginResponse();
    responseR.error = response.error;
    responseR.id = response.id;
    if ((response.is_error() === true) || (response.result === null)) {
      return null;
    }
    if (response.result && response.result.token !== undefined) {

      responseR.result = response.result.token; // Store directly the string instead of {token: 'string with the token'}
      return responseR;
    }
    return null;
  }

}
export class ApiLoginResponse extends response.JsonrpcBaseResponse {
  result?: string;
  constructor () {
    super('ApiLogin');
  }
}
export class ApiPing extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig) {
    const method = 'Api.Ping';

    super(config.address, config.protocol, config.verifyTls, method);
  }

  public parse (response: response.JsonrpcBaseResponse): ApiPingResponse| null {
    const responseR = new ApiPingResponse();
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
export class ApiPingResponse extends response.JsonrpcBaseResponse {
  result?: string;
  constructor () {
    super('ApiPing');
  }
}

export class ApiBrowse extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig) {
    const method = 'Api.Browse';
    super(config.address, config.protocol, config.verifyTls, method);
  }

  public parse (response: response.JsonrpcBaseResponse): ApiBrowseResponse|null {
    const container: string[] = [];
    const responseR = new ApiBrowseResponse();
    const responseProcess = new ApiBrowseResponse();

    responseProcess.result = response.result;
    if (response.is_error() || response.result === null) {
      return null;
    }

    if (response.result?.length === 0) {
      return null;
    }
    if (responseProcess.result !== undefined) {
      for (const value of Object.values(responseProcess.result)) {
        if (typeof value === 'object' && 'name' in value) {
          container.push((value as { name: string }).name);
        }
      }
    }
    responseR.error = response.error;
    responseR.id = response.id;
    responseR.result = container;
    return responseR;
  }
}
export class ApiBrowseResponse extends response.JsonrpcBaseResponse {
  result?: string[];
  constructor () {
    super('ApiBrowse');
  }
}

export class ApiGetPermissions extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig) {
    const method = 'Api.GetPermissions';

    super(config.address, config.protocol, config.verifyTls, method);
  }

  public parse (response: response.JsonrpcBaseResponse) {
    const container: string[] = [];
    const responseR = new ApiGetPermissionsResponse();
    const responseProcess = new ApiGetPermissionsResponse();

    responseProcess.result = response.result;
    if (response.is_error() || response.result === null) {
      return null;
    }

    if (response.result?.length === 0) {
      return null;
    }
    if (responseProcess.result !== undefined) {
      for (const value of Object.values(responseProcess.result)) {
        if (typeof value === 'object' && 'name' in value) {
          container.push((value as { name: string }).name);
        }
      }
    }
    responseR.result = container;
    responseR.error = response.error;
    responseR.id = response.id;
    return responseR;
  }
}
export class ApiGetPermissionsResponse extends response.JsonrpcBaseResponse {
  result?: string[];
  constructor () {
    super('ApiGetPermissions');
  }
}

export class ApiLogout extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string) {
    const method = 'Api.Logout';

    super(config.address, config.protocol, config.verifyTls, method, undefined, token);
  }

  public parse (response: response.JsonrpcBaseResponse): ApiLogoutResponse| null {
    const responseR = new ApiLogoutResponse();
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
export class ApiLogoutResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('ApiLogout');
  }
}

export class ApiGetCertificateUrl extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig) {
    const method = 'Api.GetCertificateUrl';

    super(config.address, config.protocol, config.verifyTls, method);
  }

  public parse (response: response.JsonrpcBaseResponse): ApiGetCertificateUrlResponse| null {
    const responseR = new ApiGetCertificateUrlResponse();
    responseR.error = response.error;
    responseR.id = response.id;
    if ((response.is_error() === true) || (response.result === null)) {
      return null;
    }
    if (response.result || response.result === '') {
      responseR.result = response.result;
      return responseR;
    }
    return null;
  }
}
export class ApiGetCertificateUrlResponse extends response.JsonrpcBaseResponse {
  result?: string;
  constructor () {
    super('ApiGetCertificateUrl');
  }
}
export class ApiVersion extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig) {
    const method = 'Api.Version';

    super(config.address, config.protocol, config.verifyTls, method);
  }

  public parse (response: response.JsonrpcBaseResponse): ApiVersionResponse| null {
    const responseR = new ApiVersionResponse();
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

export class ApiVersionResponse extends response.JsonrpcBaseResponse {
  result?: number;
  constructor () {
    super('ApiVersion');
  }
}
export class ApiCloseTickets extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, id: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);
    this.method = 'Api.CloseTicket';
    this.params = { id };
  }

  public parse (response: response.JsonrpcBaseResponse): ApiCloseTicketsResponse| null {
    const responseR = new ApiCloseTicketsResponse();
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

export class ApiCloseTicketsResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('ApiCloseTickets');
  }
}

export class ApiTicket {
  id: string = '';
  date_created: string = '';
  provider: string = '';
  state: ApiTicketState = ApiTicketState.FAILED;
  data?: object;

}
export class CustomTicket {
  max_tickets: number = 0;
  ticket: ApiTicket[] = [];
}
export class ApiBrowseTickets extends request.JsonrpcBaseRequest {
  constructor (config:request.RequestConfig, token: string, id?: string) {
    super(config.address, config.protocol, config.verifyTls, undefined, undefined, token);
    this.method = 'Api.BrowseTickets';
    if (id) {
      this.params = { id };
    }
  }

  public parse (response: response.JsonrpcBaseResponse): ApiBrowseTicketsResponse | null {
    const logger = pino();
    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }

    if ((response.result.tickets).length <= 0) {
      logger.info('Tickets array is empty');

    }

    let container: CustomTicket = new CustomTicket();
    const responseR = new ApiBrowseTicketsResponse();
    const responseProcess = new ApiBrowseTicketsResponse();
    let Var : CustomTicket | null = null;
    responseProcess.result = response.result;

    if (responseProcess.result !== undefined) {

      for (const [key, value] of Object.entries(responseProcess.result) as [string, unknown][]) {

        if (typeof key === 'string' && key === 'max_tickets') {
          Var = new CustomTicket();
          Var.max_tickets = Number(value) || 0;
        // I only create the instance when I find max_tickets because it only appears once!
        // Necessary to check if in key there is an string.
        } else if (key === 'tickets' && Var !== null) {
          if (Array.isArray(value)) {
            for (const content of value) {
              const ticket = new ApiTicket();
              ticket.id = content.id || '';
              ticket.date_created = content.date_created || '';
              ticket.provider = content.provider || '';
              ticket.state = content.state || ApiTicketState.FAILED;
              ticket.data = content.data;
              Var.ticket.push(ticket);

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

export class ApiBrowseTicketsResponse extends response.JsonrpcBaseResponse {
  result?: CustomTicket;
  constructor () {
    super('ApiBrowseTickets');
  }
}

export class QuantityStructure {
  webapi_max_http_request_body_size: number = 0;
  webapi_max_parallel_requests: number = 0;
  webapi_max_parallel_user_sessions: number = 0;

}
export class ApiGetQuantityStructures extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string) {
    const method = 'Api.GetQuantityStructures';

    super(config.address, config.protocol, config.verifyTls, method, undefined, token);

  }

  public parse (response: response.JsonrpcBaseResponse): ApiGetQuantityStructuresResponse | null {
    const logger = pino();

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result.length <= 0) {
      logger.error('There are no quantity structures');
      return null;
    }

    const responseR = new ApiGetQuantityStructuresResponse();
    const responseProcess = new ApiGetQuantityStructuresResponse();
    let vars: QuantityStructure | null = null;

    responseProcess.result = response.result;

    if (responseProcess.result !== undefined) {
      const Var = new QuantityStructure();
      for (const [key, value] of Object.entries(response.result) as unknown as [string, any]) {

        if (key === 'webapi_max_http_request_body_size') {
          Var.webapi_max_http_request_body_size = Number(value) || 0;
        }
        if (key === 'webapi_max_parallel_requests') {
          Var.webapi_max_parallel_requests = Number(value) || 0;
        }
        if (key === 'webapi_max_parallel_user_sessions') {
          Var.webapi_max_parallel_user_sessions = Number(value) || 0;
        }
        vars = Var;
      }
    }
    responseR.error = response.error;
    responseR.id = response.id;
    if (vars !== null) {
      responseR.result = vars;
    }

    return responseR;
  }
}
export class ApiGetQuantityStructuresResponse extends response.JsonrpcBaseResponse {
  result?: QuantityStructure;
  constructor () {
    super('ApiGetQuantityStructures');
  }
}

export class ApiChangePassword extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string, username: string, password: string, new_password: string) {
    const method = 'Api.ChangePassword';
    const params = { username, password, new_password };

    super(config.address, config.protocol, config.verifyTls, method, params, token);
  }

  public parse (response: response.JsonrpcBaseResponse): ApiChangePasswordResponse | null {
    const responseR = new ApiChangePasswordResponse();
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
export class ApiChangePasswordResponse extends response.JsonrpcBaseResponse {
  result?: boolean;
  constructor () {
    super('ApiChangePassword');
  }
}
export class PasswordPolicy {
  min_password_length: number = 0;
  max_password_length: number = 0;
  min_digits: number = 0;
  min_special_characters: number = 0;
  requires_uppercase_characters: boolean = false;
  requires_lowercase_characters: boolean = false;
}
export class ApiGetPasswordPolicy extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig) {
    const method = 'Api.GetPasswordPolicy';

    super(config.address, config.protocol, config.verifyTls, method);
  }

  public parse (response: response.JsonrpcBaseResponse): ApiGetPasswordPolicyResponse | null {
    const logger = pino();

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result.length <= 0) {
      logger.error('There is not password policy');
      return null;
    }

    let container: PasswordPolicy | null = null;
    const responseR = new ApiGetPasswordPolicyResponse();
    const responseProcess = new ApiGetPasswordPolicyResponse();
    responseProcess.result = response.result;
    if (responseProcess.result !== undefined) {
      for (const [key, value] of Object.entries(response.result) as [string, any]) {
        if (key === 'password_policy') {
          const values = new PasswordPolicy();

          values.min_password_length = 'min_password_length' in value ? Number(value.min_password_length) : 0;
          values.max_password_length = 'max_password_length' in value ? Number(value.max_password_length) : 0;
          values.min_digits = 'min_digits' in value ? Number(value.min_digits) : 0;
          values.min_special_characters = 'min_special_characters' in value ? Number(value.min_special_characters) : 0;
          values.requires_uppercase_characters = 'requires_uppercase_characters' in value ? Boolean(value.requires_uppercase_characters) : false;
          values.requires_lowercase_characters = 'requires_lowercase_characters' in value ? Boolean(value.requires_lowercase_characters) : false;

          container = values;
        }

      }
    }
    responseR.error = response.error;
    responseR.id = response.id;
    if (container !== null) {
      responseR.result = container;
    }
    return responseR;

  }
}

export class ApiGetPasswordPolicyResponse extends response.JsonrpcBaseResponse {
  result?: PasswordPolicy;
  constructor () {
    super('ApiGetPasswordPolicy');
  }
}
export class ApiGetAuthenticationMode extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig) {
    const method = 'Api.GetAuthenticationMode';

    super(config.address, config.protocol, config.verifyTls, method);
  }

  public parse (response:response.JsonrpcBaseResponse): ApiGetAuthenticationModeResponse | null {
    const logger = pino();

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result.length <= 0) {
      logger.error('There are not authentication modes');
      return null;
    }

    const container: string[] = [];
    const responseR = new ApiGetAuthenticationModeResponse();
    const responseProcess = new ApiGetAuthenticationModeResponse();
    responseProcess.result = response.result;

    if (responseProcess.result !== undefined) {
      for (const [key, value] of Object.entries(response.result) as unknown as [string, string[]]) { // First is mandatory to put unknown to do that typescript believe on what you expect on the response type
        if (key === 'authentication_modes') {
          container.push(value);
        }
      }
    }

    responseR.error = response.error;
    responseR.id = response.id;
    if (container !== null) {
      responseR.result = container;
    }
    return responseR;
  }
}

export class ApiGetAuthenticationModeResponse extends response.JsonrpcBaseResponse {
  result?: string[];
  constructor () {
    super('ApiGetAuthenticationMode');
  }
}
export class SessionInfoPasswordExpiration {
  timestamp: string = '';
  warning: boolean = false;
}
export class SessionInfo {
  authentication_mode?: string;
  username: string = '';
  password_expiration?: SessionInfoPasswordExpiration;
  runtime_timeout?: string;
  
}

export class ApiGetSessionInfo extends request.JsonrpcBaseRequest {
  constructor(config: request.RequestConfig) {
    const method = 'Api.GetSessionInfo';
    
    super(config.address, config.protocol, config.verifyTls, method);
  }
  public parse(response: response.JsonrpcBaseResponse): ApiGetSessionInfoResponse | null {
    const logger = pino();

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }

    let container: SessionInfo = new SessionInfo();
    let Var: SessionInfo | null = null;
    const responseR = new ApiGetSessionInfoResponse();
    const responseProcess = new ApiGetSessionInfoResponse();
    responseProcess.result = response.result;

    if (responseProcess.result !== undefined) {

      for (const [key, value] of Object.entries(responseProcess.result) as [string, unknown][]) {
        if (typeof key === 'string'){
          switch (key) {
            case 'authentication_mode':
              Var = Var || new SessionInfo();
              Var.authentication_mode = value as string;
              break;
            case 'username':
              Var = Var || new SessionInfo();
              Var.username = value as string;
              break;
            case 'password_expiration':
              Var = Var || new SessionInfo();
              if (typeof value === 'object' && value !== null) {
                const sessionPassword = new SessionInfoPasswordExpiration();
                sessionPassword.timestamp = (value as any).timestamp || '';
                sessionPassword.warning = (value as any).warning || false;
                Var.password_expiration = sessionPassword;
              }
              break;
            case 'runtime_timeout':
              Var = Var || new SessionInfo();
              Var.runtime_timeout = value as string;
              break;
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
    return null;
  }
}

export class ApiGetSessionInfoResponse extends response.JsonrpcBaseResponse {
  result?: SessionInfo;
  constructor () {
    super('ApiGetSessionInfo');
  }
}
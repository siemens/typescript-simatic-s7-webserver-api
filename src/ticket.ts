import pino from 'pino';
import axios, { AxiosResponse } from 'axios';
import * as request from './request';
import * as response from './response';
import https from 'https';
export class TicketDownloadData extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, ticket_id: string, token?: string) {
    const method = 'NotUsed';
    const params = { id: ticket_id };
    super(config.address, config.protocol, config.verifyTls, method, params, token, undefined, undefined, config.plcCertificate);
  }

  public body () {
    /**
     * Overwrites the body method of base request.
     * No body is needed for ticket requests
     * */
    return null;
  }

  public url () {
    /**
     * Creates the url based on the information address and protocol
     * Differs from base JSONRPC request in the route params
     */
    let id;
    if (this.params) {
      id = this.params.id;
    }
    return `${this.protocol}://${this.address}/api/ticket?id=${id}`;
  }

  public async request (): Promise<AxiosResponse> {
    try {

      this.response = await axios.get(this.url(), { headers: this.headers(), httpsAgent: this.gethttpsAgent() });
      return this.response;

    } catch (error) {
      console.error(error);
      throw error;
    }

  }

  public async execute (): Promise <response.JsonrpcBaseResponse|null> {
    const get_res = await this.request();
    const logger = pino();
    logger.debug(this.__str__());
    logger.debug(this.format_response());

    if (get_res == null) {
      logger.error('Response was empty, unable to parse');

      return null;
    }
    const res = new response.JsonrpcBaseResponse();

    // I'm doing the same than inthe parse method of response but I'm not calling it because in upload I need to check also if its 204
    if (Number(get_res.status) !== 200 && Number(get_res.status) !== 204) {
      logger.error(`Failed to retrieve data from ticket ${this.params}, request returned response code ${get_res.status} `);
      console.log(`Failed to retrieve data from ticket ${this.params}, request returned response code ${get_res.status} `);
      return null;
    }
    const json_response = get_res.data;

    if (json_response !== undefined) {

      res.result = json_response;
      return res;
    }

    if (json_response.error !== undefined) {
      let msg = null;
      let code = -1;
      if (json_response.error.message !== undefined) {
        msg = json_response.error.message;
      }
      if (json_response.error.code !== undefined) {
        code = json_response.error.code;
      }

      res.error = new response.JsonrpcError(get_res.status, code, msg);
      return res;
    }
    return null;
  }
}

export class TicketUploadData extends TicketDownloadData {
  data: Uint8Array;
  constructor (config: request.RequestConfig, ticket_id: string, data: Uint8Array, token: string) {
    super(config, ticket_id, token);
    this.data = data;
  }

  public headers (): Record<string, string> {
    if (this.token !== undefined) {
      return {
        'Content-type': 'application/octet-stream',
        'X-Auth-Token': this.token
      };
    }
    return { 'Content-type': 'application/octet-stream' };
  }

  public async request (): Promise<AxiosResponse> {
    try {

      this.response = await axios.post(this.url(), this.data, { headers: this.headers(), httpsAgent: this.gethttpsAgent() });

      return this.response;

    } catch (error) {
      console.error(error);
      throw error;
    }

  }

  public async execute (): Promise <response.JsonrpcBaseResponse|null> {
    const ExecuteResponse = new response.JsonrpcBaseResponse();
    const post_res = await this.request();
    const logger = pino();

    logger.debug(this.__str__());
    logger.debug(this.format_response());

    if (post_res == null) {
      logger.error('Response was empty, unable to parse');
      console.log('Response was empty, unable to parse');
      return null;
    }

    if (Number(post_res.status) !== 200 && Number(post_res.status) !== 204) { // Still receiving number 204 NO CONTENT when Im uploading
      logger.error(`Failed to retrieve data from ticket ${this.params}, request returned response code ${post_res.status} `);
      console.log(`Failed to retrieve data from ticket ${this.params}, request returned response code ${post_res.status} `);
      return null;
    }
    const json_response = post_res.data;

    if (json_response !== undefined) {
      console.log('UPLOAD DATA', json_response);
      ExecuteResponse.result = json_response;
      return ExecuteResponse;
    }
    return null;

  }

}

export class ProxyTicketDownloadData extends TicketDownloadData {
  proxyAddress: string;

  constructor (config: request.RequestConfig, ticket_id: string, proxyAddress: string, token?: string) {
    super(config, ticket_id, token);
    this.proxyAddress = proxyAddress;
  }

  public url () {
    /**
         * Creates the url based on the proxy server address
         */
    let id;
    if (this.params) {
      id = this.params.id;
    }
    return `${this.proxyAddress}/api/ticket?id=${id}`;
  }

  public headers (): Record<string, string> {
    if (this.token !== undefined) {
      return {
        'Content-type': 'application/octet-stream',
        'X-Auth-Token': this.token,
        'x-plc-ip': this.address
      };
    }
    return { 'Content-type': 'application/octet-stream' };
  }
}

export class ProxyTicketUploadData {
  proxyAddress: string;
  data: Uint8Array;
  token: string;
  address: string; // PLC IP address
  ticket_id: string;

  constructor (proxyAddress: string, address: string, ticket_id: string, data: Uint8Array, token: string) {
    this.proxyAddress = proxyAddress;
    this.address = address;
    this.ticket_id = ticket_id;
    this.data = data;
    this.token = token;
  }

  public headers () {
    return {
      'Content-type': 'application/octet-stream',
      'X-Auth-Token': this.token,
      'x-plc-ip': this.address, // Send the PLC IP to the proxy
      'x-plc-ticket': this.ticket_id // Send the ticket ID to the proxy
    };
  }

  public url () {
    /**
         * Creates the url based on the proxy server address
         */

    return `${this.proxyAddress}/api/ticket-upload`;
  }

  public gethttpsAgent (): https.Agent | undefined {

    return new https.Agent({ rejectUnauthorized: false });

  }

  public async request (): Promise<AxiosResponse> {
    try {
      // Send the data to the proxy
      const response = await axios.post(this.url(), this.data, {
        headers: this.headers(),
        httpsAgent: this.gethttpsAgent()
      });
      return response;
    } catch (error) {
      console.error('Error uploading to proxy:', error);
      throw error;
    }
  }

  public async execute (): Promise<response.JsonrpcBaseResponse | null> {
    const logger = pino();
    try {
      const post_res = await this.request();

      logger.debug(`Request to proxy was successful: ${post_res.status}`);
      if (post_res.status !== 200 && post_res.status !== 204) {
        logger.error(`Failed to upload to proxy. Response code: ${post_res.status}`);
        return null;
      }

      const json_response = post_res.data;
      const executeResponse = new response.JsonrpcBaseResponse();
      executeResponse.result = json_response;

      return executeResponse;
    } catch (error) {
      logger.error('Error in execute method:', error);
      return null;
    }
  }
}

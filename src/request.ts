import axios, { AxiosResponse } from 'axios';
import moment from 'moment';
import pino from 'pino';
import https from 'https';
import * as response from './response';

// Detect if we're running in a browser environment
const isBrowser = typeof window !== 'undefined';

export class RequestConfig {
  /**
   * Base configuration for all requests
   *
   * @attribute address: Address of the PLC webserver, can be either a IPv4/ IPv6 address
   *   or the DNS name
   *    Must not contain the protocol definition, this has to be set
   *   via the protocol attribute
   * @attribute protocol: defines the protocol (http/https) for connecting to the PLC
   * @attribute verifyTls: Switch wether TLS Server Certificate should be verified against
   *    trusted certificates or trusted by default
   * @attribute plcCertificate: Identifies the certificate from the PLC in the local system to be able to access the PLC.
   */
  address = '';
  protocol = '';
  verifyTls = true;
  plcCertificate?: Buffer;
}

export class JsonrpcBaseRequest {
  /**
   * Represents a base type for all jsonrpc requests against
   * the SIMATC S7 webserver
   * Provides all functions to build the request and execute it.
   *
   * @attribute method: defines the jsonrpc method and functions that are
   *    defined for the WebAPI
   * @attribute params: defines additional parameters required by the specific request methods
   * @attribute address: Address of the PLC webserver, can be either a IPv4/ IPv6 address
   *    or the DNS name
   *    Must not contain the protocol definition, this has to be set
   *    via the protocol attribute
   * @attribute protocol: defines the protocol (http/https) for connecting to the PLC
   * @attribute token: Token for authentication and authorization on the PLC
   * @attribute verifyTls: Switch wether TLS Server Certificate should be verified against
   *    trusted certificates or trusted by default
   * @attribute plcCertificate: File that contains the PLC certificate to be able to access the PLC.
   */

  method ?: string;
  params ?: Record<string, any>;
  address : string = '';
  protocol : string = '';
  token ?: string;
  verifyTls : boolean = true;
  response ?: AxiosResponse;
  plcCertificate?: Buffer;
  private reqID ?: number;

  constructor (address: string, protocol: string, verifyTls: boolean, method?: string, params?: Record<string, unknown>, token?: string, reqID ?: number, response?: AxiosResponse, plcCertificate?: Buffer) {
    this.method = method;
    this.params = params;
    this.address = address;
    this.protocol = protocol;
    this.token = token;
    this.verifyTls = verifyTls;
    this.response = response;
    this.plcCertificate = plcCertificate;
    this.reqID = reqID;
  }

  public headers (): Record<string, string> {
    /**
     * Creates an object for the necessary header fields.
     */
    if (this.token !== undefined) {
      return {
        'Content-type': 'application/json',
        'X-Auth-Token': this.token
      };
    }
    return { 'Content-type': 'application/json' };
  }

  public gethttpsAgent (): any {
    // Skip HTTPS Agent creation in browser environments
    if (isBrowser) {
      console.log('Browser environment detected, skipping HTTPS Agent creation');
      return undefined;
    }

    // Create HTTPS Agent only in Node.js environments
    try {
      if (this.verifyTls === false) {
        return new https.Agent({ rejectUnauthorized: false });
      } else if (this.plcCertificate) {
        console.log('Using PLC Certificate');
        return new https.Agent({ ca: this.plcCertificate });
      }
    } catch (error) {
      console.warn('Failed to create HTTPS Agent:', error);
    }
    return undefined;
  }

  public body ():{
    id: number;
    jsonrpc: string;
    method ?: string;
    params?: Record<string, any>;
  } | null | undefined {
    const req_body: {
      id: number;
      jsonrpc: string;
      method?: string;
      params?: Record<string, any>;
    } = {
      id: Math.floor(Math.random() * 1000),
      jsonrpc: '2.0',
      method: this.method
    };
    /**
     * Creates the body object of the request
     */
    this.reqID = req_body.id;
    if (this.params) {
      req_body.params = this.params;
    }

    return req_body;
  }

  public url () {
    /**
     * Creates the url based on the information address and protocol
     */
    return `${this.protocol}://${this.address}/api/jsonrpc`;
  }

  public __str__ () {
    return `--HTTP POST Request to ${this.url()}---
      \tHeaders: ${JSON.stringify(this.headers())}
      \tBody: ${JSON.stringify(this.body())}`;
  }

  public async request (): Promise<AxiosResponse> {
    /**
     * Executes the POST request against the webserver.
     *
     * @param {Axios} axiosObject - The Axios object used for making the POST request.
     * @returns {Promise<AxiosResponse>} A Promise that resolves to an Axios response.
     */
    // Create request config with browser compatibility in mind
    const requestConfig: any = {
      headers: this.headers()
    };

    // Only add httpsAgent if we're not in a browser
    if (!isBrowser) {
      const agent = this.gethttpsAgent();
      if (agent) {
        requestConfig.httpsAgent = agent;
      }
    }

    this.response = await axios.post(this.url(), this.body(), requestConfig);
    return this.response;
  }

  public async execute (): Promise<response.JsonrpcBaseResponse|null> {
    // Create a compatible logger
    let logger;
    if (isBrowser) {
      // In browser, use console instead of pino
      logger = {
        debug: console.log,
        error: console.error
      };
    } else {
      logger = pino();
    }

    try {
      const post_res = await this.request();

      logger.debug(this.__str__());
      logger.debug(this.format_response());

      if (post_res == null) {
        logger.error('Response was empty, unable to parse');
        return null;
      }

      const res = response.JsonrpcBaseResponse.parse(post_res);

      if (res === undefined) {
        logger.error('Unable to parse the response, it is not typical jsonrpc format');
        console.log(('Unable to parse the response, it is not typical jsonrpc format'));
        return null;
      }

      if (res?.is_error() === true) {
        logger.error(`WebAPI responded with an error: ${res.error?.toString()}`);
        console.log(`WebAPI responded with an error: ${res.error?.toString()}`);
        return null;
      }

      if (res) {
        return this.parse(res);
      }
    } catch (error) {
      logger.error('Request execution failed:', error);
      console.error('Request execution failed:', error);
    }

    return null;
  }

  public format_response () {
    if (this.response === undefined) {
      return undefined;
    }
    const current_time = moment().format('YYYY-MM-DD HH:mm:ss');

    return `--HTTP POST Request --- ${current_time}
      \tResponse code: ${this.response.status}
      \tResponse: ${JSON.stringify(this.response.data)}`;
  }

  public async bulkRequest (requestObject: { url: string, headers: Record<string, string>, data: unknown[], httpsAgent: unknown }): Promise<AxiosResponse> {
    /**
     * Builds a single request body with multiple entries by iterating through
     * paramsArray, using the existing `body()` method to structure each entry.
     */

    // Create a browser-compatible request config
    const requestConfig: any = {
      headers: requestObject.headers
    };

    // Only add httpsAgent if not in browser environment
    if (!isBrowser && requestObject.httpsAgent) {
      requestConfig.httpsAgent = requestObject.httpsAgent;
    }

    this.response = await axios.post(requestObject.url, requestObject.data, requestConfig);
    return this.response;
  }

  public async bulkExecute (paramsArray: Array<Record<string, unknown>>): Promise<response.JsonrpcBaseResponse[]|null> {
    /**
     * Builds a single request body with multiple entries by iterating through
     * paramsArray, using the existing `body()` method to structure each entry.
     */
    // Create a compatible logger
    let logger;
    if (isBrowser) {
      logger = {
        debug: console.log,
        error: console.error
      };
    } else {
      logger = pino();
    }

    // Create the request object with browser compatibility in mind
    const requestObject = {
      url: this.url(),
      method: 'POST',
      headers: this.headers(),
      data: paramsArray.map((params) => {
        this.params = params;
        return this.body();
      }),
      httpsAgent: isBrowser ? undefined : this.gethttpsAgent()
    };

    try {
      const post_res = await this.bulkRequest(requestObject) as AxiosResponse;

      logger.debug(this.__str__());
      logger.debug(this.format_response());

      // Check if the response is valid and contains an array
      if (!post_res || !Array.isArray(post_res.data)) {
        logger.error('Response was empty or not in expected batch format');
        return null;
      }

      return this.parseResponses(post_res);
    } catch (error) {
      logger.error('Bulk request execution failed:', error);
      console.error('Bulk request execution failed:', error);
      return null;
    }
  }

  public parse (response: response.JsonrpcBaseResponse): response.JsonrpcBaseResponse | null {
    /**
     * Parses the response of a simple request and returns the
     * result as an object. Only checks if the response has an error or if the result of the response is empty.
     * If no result is provided or the request failed None is returned.
     *
     * @param response The {@link JsonRpcBaseResponse<JsonRpcBaseResponse>} object
     */
    // Use console in browser, pino in Node
    const logger = isBrowser ? console : pino();

    if (response.is_error() === true) {
      if (isBrowser) {
        console.debug('Response has error');
      } else {
        logger.debug('Response has error');
      }
      return null;
    }

    if (response.result === undefined) {
      if (isBrowser) {
        console.debug('Response result structure is null');
      } else {
        logger.debug('Response result structure is null');
      }
      return null;
    }

    return response;
  }

  public parseResponses (responses: AxiosResponse): response.JsonrpcBaseResponse[] | null {
    const parsedResponses = response.JsonrpcBaseResponse.parseBulk(responses);

    if (!parsedResponses) {
      console.log('Failed to parse the bulk response.');
      return null;
    }

    return parsedResponses;
  }
}

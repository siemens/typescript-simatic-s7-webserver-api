
import * as Axios from 'axios';

export class JsonrpcError {
  /**
     * Base type for all errors returned by the SIMATIC S7 Webserver

    @param code: Code of the error, defined in webserver documentation
    @param message: Optional additional information provided by the Webserver
    @param http_code: HTTP Response code provided by the server response
    */
  code: number;
  message?: string;
  http_code: number;

  constructor (http_code: number, code: number = -1, message?: string) {
    /**
     * Constructor for the error type

    @param http_code: HTTP Response code provided by the server response
    @param code: Optional code of the error, defined in webserver documentation
    @param message: Optional additional information provided by the Webserver
    */

    this.http_code = http_code;
    this.code = code;
    this.message = message;
  }

  public toString (): string {
    /** String formatter for the error type
    */
    if (this.message) {
      return `HTTP ${this.http_code} - [${this.code}]: ${this.message}`;
    }

    return `HTTP ${this.http_code} - [${this.code}]: No message, further information provided in the docs`;
  }

}

export class JsonrpcBaseResponse {
  /**
     * Base type for all responsed returned by the SIMATIC S7 Webserver

     @param error: Generic type for error if there is one, else None
     @param result: Object that provides result data
     */
  readonly kind ?: string;
  id: number = 0;
  error ?: JsonrpcError;
  result ?: any; // object

  // Create result: Record,
  // Create a switch and check type of result

  constructor (kind ?: string, id ?: number, error?: JsonrpcError, result?: Record<string, unknown>) {
    this.kind = kind;
    this.id = id !== undefined ? id : 0;
    this.error = error;
    this.result = result;
  }

  public is_error (): boolean {
    if (this.error != null) {
      return true;
    }
    return false;
  }

  static parse (response: Axios.AxiosResponse): JsonrpcBaseResponse | null {
    /**
         * Tries to parse a generic HTTP response into the specific jsonrpc
         * response format. Returns None if parsing is not successfull

         @param response: Generic HTTP response
         */

    const res = new JsonrpcBaseResponse();
    res.id = response.data.id;
    if (Number(response.status) !== 200) {
      res.error = new JsonrpcError(response.status, -1);
      return res;
    }

    const json_response = response.data;

    if (typeof json_response === 'string') {
      // Try to convert the string in a Json Object
      const jsonStringCleaned = json_response.replace(/\n/g, ''); // clean the string from changes of line
      const resultObject = JSON.parse(jsonStringCleaned);

      // Verify if the result objects is not null and its a valid object
      if (resultObject !== null && typeof resultObject === 'object') {

        res.result = resultObject.result;
        return res;
      } else {
        console.log('The result of the conversion is not a valid JSON object.');

      }
    } else if (json_response.result !== undefined) {

      res.result = json_response.result;
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

      res.error = new JsonrpcError(response.status, code, msg);
      return res;
    }

    return null;
  }

  static parseBulk (response: Axios.AxiosResponse): JsonrpcBaseResponse[] | null {

    /**
       * Parses a bulk HTTP response containing multiple JSON-RPC responses.
       * Checks the main response status and then iterates over each entry in response.data.
       *
       * @param response - The full HTTP response from Axios
       * @returns Array of parsed JsonrpcBaseResponse or null if parsing fails
       */
    const parsedResponses: JsonrpcBaseResponse[] = [];
    // Check if the main HTTP response status is valid
    if (Number(response.status) !== 200) {
      const errorResponse = new JsonrpcBaseResponse();
      errorResponse.error = new JsonrpcError(response.status, -1);

      parsedResponses.push(errorResponse);
      return parsedResponses;
    }
    // Check if response.data is an array as expected for bulk responses
    if (!Array.isArray(response.data)) {
      console.error('Invalid data format: Expected an array in response.data');
      return null;
    }

    // Process each item in response.data array
    for (const respData of response.data) {
      const res = new JsonrpcBaseResponse();
      res.id = respData.id;

      // Check for errors in each individual JSON-RPC response
      if (respData.error !== undefined) {
        let msg = null;
        let code = -1;
        if (respData.error.message !== undefined) {
          msg = respData.error.message;
        }
        if (respData.error.code !== undefined) {
          code = respData.error.code;
        }
        res.error = new JsonrpcError(response.status, code, msg);
      } else if (respData.result !== undefined) {
        // Valid result in individual response
        res.result = respData.result;
      } else {
        // Log any unexpected format
        console.log('Invalid response entry', respData);
        continue; // Skip adding to parsedResponses
      }

      // Add the parsed response to the results array
      parsedResponses.push(res);
    }

    return parsedResponses.length > 0 ? parsedResponses : null;
  }

  public __str__ (): string {
    if (this.is_error() === true) {
      return `Error response: ${this.error?.toString()}`;
    }
    return `Good response: ${this.result}`;
  }

}

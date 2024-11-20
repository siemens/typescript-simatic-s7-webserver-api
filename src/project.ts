import * as response from './response';
import * as request from './request';
import * as pino from 'pino';

export class Languages {
  language: string = '';
}
export class ProjectLanguages extends request.JsonrpcBaseRequest {
  constructor (config: request.RequestConfig, token: string) {
    const method = 'Project.ReadLanguages';
    super(config.address, config.protocol, config.verifyTls, method, undefined, token);
  }

  public parse (response: response.JsonrpcBaseResponse): ProjectLanguagesResponse | null {
    const logger = pino.pino();

    if (response.is_error() || !response.result) {
      logger.error('Response has error or response result does not exist');
      return null;
    }
    if (response.result.languages <= 0) {
      logger.error('There are no languages configured in this project');
      return null;
    }

    const responseProcess = new ProjectLanguagesResponse();
    const responseR = new ProjectLanguagesResponse();
    const container : Languages[] = [];
    let Vars: Languages | null = null;
    responseProcess.result = response.result;
    console.log(response.result);
    if (responseProcess.result !== undefined) {
      for (const [key, value] of Object.entries(response.result)) {
        if (key === 'languages' && Array.isArray(value)) {
          Vars = new Languages();
          for (const content of value) {
            if (typeof content === 'object' && content !== null && 'language' in content) {

              Vars.language = content.language || '';
              container.push(Vars);
            }
          }
        }
      }
    }
    responseR.error = response.error;
    responseR.id = response.id;
    responseR.result = container;
    return responseR;
  }
}
export class ProjectLanguagesResponse extends response.JsonrpcBaseResponse {
  result?: Languages[];
  constructor () {
    super('ProjectReadLanguages');
  }
}

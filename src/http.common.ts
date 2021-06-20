import { Http, HttpRequestOptions, HttpResponse } from '@nativescript/core';

export interface HttpClientEntry extends HttpRequestOptions {

}

export interface HttpClientResponse extends HttpResponse {

}

declare global {
  // eslint-disable-next-line no-unused-vars
  module NodeJS {
    // eslint-disable-next-line no-unused-vars
    interface Global {
      http: HttpClient;
    }
  }
}

export interface HttpClientOptions {
  unauthenticatedStatusCodes?: Array<number>;
  unauthenticatedCallback?: (response: HttpClientResponse) => void;
  baseUrl?: string;
}
export class HttpClient {
  private unauthenticatedStatusCodes: Array<number>;
  private unauthenticatedCallback: (response: HttpClientResponse) => void;

  /**
   * When the base url is set the request url will be added to the base
   */
  private baseUrl: string;
  // TODO: base url
  // TODO: content type json when set
  constructor (options: HttpClientOptions) {
    this.unauthenticatedStatusCodes = options.unauthenticatedStatusCodes ? options.unauthenticatedStatusCodes : [];
    this.unauthenticatedCallback = options.unauthenticatedCallback ? options.unauthenticatedCallback : () => {};
    this.baseUrl = options.baseUrl ? options.baseUrl : '';
  }

  request (options: HttpClientEntry) : Promise<HttpClientResponse> {
    options.url = this.getUrl(options);
    return Http.request(options).then(response => {
      // Check if status code matches one of the unauthenticated codes
      this.unauthenticatedStatusCodes.forEach((httpCode) => {
        if (httpCode === response.statusCode) {
          if (this.unauthenticatedCallback) {
            this.unauthenticatedCallback(response);
          }
        }
      });
      return response;
    }).catch(error => {
      return error;
    });
  }

  private getUrl (options: HttpClientEntry) {
    if (this.baseUrl !== '') {
      return this.baseUrl + options.url;
    }
    return options.url;
  }
}

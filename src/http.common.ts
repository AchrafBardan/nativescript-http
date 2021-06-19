import { Http, HttpRequestOptions, HttpResponse } from '@nativescript/core';

export interface HttpClientEntry extends HttpRequestOptions {

}

export interface HttpClientResponse extends HttpResponse {

}

export interface HttpClientOptions {
  unauthenticatedStatusCodes?: Array<number>;
  unauthenticatedCallback?: (response: HttpClientResponse) => void;
}
export class HttpClient {
  private unauthenticatedStatusCodes: Array<number>;
  private unauthenticatedCallback: (response: HttpClientResponse) => void;
  constructor (options: HttpClientOptions) {
    this.unauthenticatedStatusCodes = options.unauthenticatedStatusCodes;
  }

  request (options: HttpClientEntry) : Promise<HttpClientResponse> {
    return Http.request(options).then(response => {
      // Check if status code matches one of the unauthenticated codes
      this.unauthenticatedStatusCodes.forEach((httpCode) => {
        if (httpCode === response.statusCode) {
          this.unauthenticatedCallback(response);
        }
      });
      return response;
    }).catch(error => {
      return error;
    });
  }
}

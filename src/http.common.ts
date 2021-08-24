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
  defaultHeaders?: any;
  bearerToken: () => string;
}
export class HttpClient {
  private unauthenticatedStatusCodes: Array<number>;
  private unauthenticatedCallback: (response: HttpClientResponse) => void;
  private baseUrl: string;
  private defaultHeaders: any;
  private bearerToken?: () => string | string;

  constructor (options?: HttpClientOptions) {
    this.unauthenticatedStatusCodes = options.unauthenticatedStatusCodes ? options.unauthenticatedStatusCodes : [];
    this.unauthenticatedCallback = options.unauthenticatedCallback ? options.unauthenticatedCallback : () => {};
    this.baseUrl = options.baseUrl ? options.baseUrl : '';
    this.defaultHeaders = options.defaultHeaders ? options.defaultHeaders : undefined;
    
    if(options.bearerToken === String) {
      this.bearerToken = () : string => {
        return options.bearerToken.toString();
      }
    }
    else {
      this.bearerToken = options.bearerToken;
    }
    
  }

  request (options: HttpClientEntry) : Promise<HttpClientResponse> {
    options.url = this.getUrl(options);

    // add defaultHeaders
    if (this.defaultHeaders !== undefined && options.headers) {
      options.headers = Object.assign(options.headers, this.defaultHeaders);
    } else if (this.defaultHeaders !== undefined && !options.headers) {
      options.headers = this.defaultHeaders;
    }

    if(this.bearerToken){
      options.headers.Authorization = 'Bearer '+ this.bearerToken();
    }

    console.log(options);
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

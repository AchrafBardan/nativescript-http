import { HttpRequestOptions, HttpResponse } from '@nativescript/core';
export interface HttpClientEntry extends HttpRequestOptions {
}
export interface HttpClientResponse extends HttpResponse {
}
declare global {
    module NodeJS {
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
export declare class HttpClient {
    private unauthenticatedStatusCodes;
    private unauthenticatedCallback;
    private baseUrl;
    private defaultHeaders;
    private bearerToken?;
    constructor(options?: HttpClientOptions);
    request(options: HttpClientEntry): Promise<HttpClientResponse>;
    private getUrl;
}

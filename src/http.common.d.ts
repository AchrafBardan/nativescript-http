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
}
export declare class HttpClient {
    private unauthenticatedStatusCodes;
    private unauthenticatedCallback;
    /**
     * When the base url is set the request url will be added to the base
     */
    private baseUrl;
    constructor(options: HttpClientOptions);
    request(options: HttpClientEntry): Promise<HttpClientResponse>;
    private getUrl;
}

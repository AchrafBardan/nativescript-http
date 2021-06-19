import { HttpRequestOptions, HttpResponse } from '@nativescript/core';
export interface HttpClientEntry extends HttpRequestOptions {
}
export interface HttpClientResponse extends HttpResponse {
}
export interface HttpClientOptions {
    unauthenticatedStatusCodes?: Array<number>;
    unauthenticatedCallback?: (response: HttpClientResponse) => void;
}
export declare class HttpClient {
    private unauthenticatedStatusCodes;
    private unauthenticatedCallback;
    constructor(options: HttpClientOptions);
    request(options: HttpClientEntry): Promise<HttpClientResponse>;
}

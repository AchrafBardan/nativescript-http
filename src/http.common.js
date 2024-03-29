"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
var core_1 = require("@nativescript/core");
var HttpClient = /** @class */ (function () {
    function HttpClient(options) {
        this.unauthenticatedStatusCodes = options.unauthenticatedStatusCodes ? options.unauthenticatedStatusCodes : [];
        this.unauthenticatedCallback = options.unauthenticatedCallback ? options.unauthenticatedCallback : function () { };
        this.baseUrl = options.baseUrl ? options.baseUrl : '';
        this.defaultHeaders = options.defaultHeaders ? options.defaultHeaders : undefined;
        if (options.bearerToken === String) {
            this.bearerToken = function () {
                return options.bearerToken.toString();
            };
        }
        else {
            this.bearerToken = options.bearerToken;
        }
    }
    HttpClient.prototype.request = function (options) {
        var _this = this;
        options.url = this.getUrl(options);
        // add defaultHeaders
        if (this.defaultHeaders !== undefined && options.headers) {
            options.headers = Object.assign(options.headers, this.defaultHeaders);
        }
        else if (this.defaultHeaders !== undefined && !options.headers) {
            options.headers = this.defaultHeaders;
        }
        if (this.bearerToken) {
            options.headers.Authorization = 'Bearer ' + this.bearerToken();
        }
        console.log(options);
        return core_1.Http.request(options).then(function (response) {
            // Check if status code matches one of the unauthenticated codes
            _this.unauthenticatedStatusCodes.forEach(function (httpCode) {
                if (httpCode === response.statusCode) {
                    if (_this.unauthenticatedCallback) {
                        _this.unauthenticatedCallback(response);
                    }
                }
            });
            return response;
        }).catch(function (error) {
            return error;
        });
    };
    HttpClient.prototype.getUrl = function (options) {
        if (this.baseUrl !== '') {
            return this.baseUrl + options.url;
        }
        return options.url;
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//# sourceMappingURL=http.common.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
var core_1 = require("@nativescript/core");
var HttpClient = (function () {
    function HttpClient(options) {
        this.unauthenticatedStatusCodes = options.unauthenticatedStatusCodes;
    }
    HttpClient.prototype.request = function (options) {
        var _this = this;
        return core_1.Http.request(options).then(function (response) {
            _this.unauthenticatedStatusCodes.forEach(function (httpCode) {
                if (httpCode === response.statusCode) {
                    _this.unauthenticatedCallback(response);
                }
            });
            return response;
        }).catch(function (error) {
            return error;
        });
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//# sourceMappingURL=http.common.js.map
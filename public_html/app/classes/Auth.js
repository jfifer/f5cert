"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
require('rxjs/Rx');
require('js/sha1.js');
var Auth = (function () {
    function Auth(http) {
        this.http = http;
        this.username = "";
        this.uid = -1;
        this.url = "/api/auth";
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    Auth.prototype.logout = function () {
        this.url = "/api/auth";
        return this.http.post(this.url, null, { headers: this.headers }).map(function (res) {
            return true;
        });
    };
    Auth.prototype.checkAuth = function () {
        this.url = "/api/auth";
        return this.http.get(this.url).map(function (res) {
            return JSON.parse(res._body);
        });
    };
    Auth.prototype.login = function (username, password) {
        this.url = "/api/auth/" + username + "/" + sha1(password);
        return this.http.post(this.url, null, { headers: this.headers }).map(function (res) {
            return true;
        });
    };
    Auth = __decorate([
        core_1.Component({
            selector: 'auth',
            template: ""
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map

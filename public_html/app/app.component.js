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
var Auth_1 = require('./classes/Auth');
var SSL_1 = require('./classes/SSL');
var Jira_1 = require('./classes/Jira');
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.username = "";
        this.password = "";
        this.auth = new Auth_1.Auth(this.http);
        this.ssl = new SSL_1.SSL(this.http);
        this.jira = new Jira_1.Jira(this.http, this.auth);
        this.checkAuth();
    }
    AppComponent.prototype.doClicky = function (res) {
        this.ssl.updateDN(res);
    };
    AppComponent.prototype.checkAuth = function () {
        var _this = this;
        this.auth.checkAuth().subscribe(function (res) {
            if (parseInt(res.uid) === -1) {
                _this.uid = -1;
            }
            else {
                _this.uid = res.uid;
            }
        });
    };
    AppComponent.prototype.login = function () {
        var _this = this;
        this.auth.login(this.username, this.password).subscribe(function (res) {
            _this.checkAuth();
        });
    };
    AppComponent.prototype.logout = function () {
        var _this = this;
        this.auth.logout().subscribe(function (res) {
            _this.checkAuth();
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/assets/partials/home.html',
            providers: [Auth_1.Auth, SSL_1.SSL, Jira_1.Jira]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
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
var http_1 = require('@angular/http');
var Auth_1 = require('./Auth');
var Jira = (function () {
    function Jira(http, auth) {
        var _this = this;
        this.http = http;
        this.auth = auth;
        this.jiraUpdate = new core_1.EventEmitter();
        this.jiraIssues = [];
        this.headers = new http_1.Headers();
        this.headers.append("Content-Type", "application/json");
        this.findAllOpenIssues().subscribe(function (res) {
            _this.jiraIssues = res.issues;
        });
    }
    Jira.prototype.doPost = function (url) {
        return this.http.post(url, { username: "jfifer@coredial.com", password: "**********" }, { headers: this.headers }).map(function (res) { return JSON.parse(res.json()); });
    };
    Jira.prototype.getJiraIssue = function (id) {
        var _this = this;
        this.issueId = id;
        this.doPost("/api/jira/issue/" + id).subscribe(function (res) {
            var dn = {};
            dn.commonName = res.fields.customfield_10909;
            dn.emailAddress = res.fields.customfield_10913;
            dn.organizationName = res.fields.customfield_10910;
            dn.organizationalUnitName = res.fields.customfield_10908;
            dn.localityName = res.fields.customfield_10907;
            dn.stateOrProvinceName = res.fields.customfield_10906;
            dn.countryName = res.fields.customfield_10905;
            _this.jiraUpdate.next(dn);
        });
    };
    Jira.prototype.findAllOpenIssues = function () {
        this.url = "/api/jira/";
        return this.http.post(this.url, { username: "jfifer@coredial.com", password: "***********" }, { headers: this.headers }).map(function (res) { return JSON.parse(res.json()); });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Jira.prototype, "jiraUpdate", void 0);
    Jira = __decorate([
        core_1.Component({
            selector: "jira",
            templateUrl: "app/assets/partials/jira.html",
            providers: [Auth_1.Auth]
        }), 
        __metadata('design:paramtypes', [http_1.Http, Auth_1.Auth])
    ], Jira);
    return Jira;
}());
exports.Jira = Jira;
//# sourceMappingURL=Jira.js.map

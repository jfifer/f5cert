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
var forms_1 = require('@angular/forms');
var SSL = (function () {
    function SSL(http) {
        this.http = http;
        this.done = false;
        this.url = "/api/ssl/";
        this.err = false;
        this.errMsg = "";
        this.fb = new forms_1.FormBuilder();
        this.dn = this.fb.group({
            commonName: '',
            emailAddress: '',
            organizationName: '',
            organizationalUnitName: '',
            localityName: '',
            stateOrProvinceName: '',
            countryName: ''
        });
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    SSL.prototype.updateDN = function (res) {
        console.log(res);
        this.dn = this.fb.group({
            commonName: 'bork',
            emailAddress: 'bork',
            organizationName: '',
            organizationalUnitName: '',
            localityName: '',
            stateOrProvinceName: '',
            countryName: ''
        });
    };
    SSL.prototype.parseUrlStr = function (obj) {
        return Object.keys(obj).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
    };
    SSL.prototype.generateCSR = function (value) {
        this.url = "/api/ssl/generatecsr/";
        return this.http.post(this.url, value, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
        });
    };
    SSL.prototype.createKey = function (value) {
        var _this = this;
        this.url = "/api/ssl/createkey/";
        return this.http.post(this.url, value, { headers: this.headers }).map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (!res.err) {
                _this.done = true;
                _this.err = false;
            }
            else {
                _this.errMsg = res.message;
                _this.err = true;
            }
        });
    };
    SSL.prototype.resetCSRForm = function () {
        this.done = false;
        this.err = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], SSL.prototype, "dn", void 0);
    SSL = __decorate([
        core_1.Component({
            selector: "csr-gen",
            templateUrl: "app/assets/partials/csr-gen.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SSL);
    return SSL;
}());
exports.SSL = SSL;
//# sourceMappingURL=SSL.js.map

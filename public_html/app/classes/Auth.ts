import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'js/sha1.js';

declare var sha1: any;

@Component({
   selector: 'auth',
   template: ``
})
export class Auth  {
   username: string = "";
   uid: any = -1;
   res: any;
   sha1: any;
   private url: string = "/api/auth";
   private password: string;
   private headers: Headers;

   constructor(private http: Http) {
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
   }

   logout() {
      this.url = "/api/auth";
      return this.http.post(this.url, null, {headers: this.headers}).map((res:any) => {
         return true;
      });
   }

   checkAuth() {
      this.url = "/api/auth";
      return this.http.get(this.url).map((res:any) => {
         return JSON.parse(res._body);
      });
   }

   login(username: string, password: string) {
      this.url = "/api/auth/"+username+"/"+sha1(password);
      return this.http.post(this.url, null, {headers: this.headers}).map((res:any) => {
         return true;
      });
   }
}


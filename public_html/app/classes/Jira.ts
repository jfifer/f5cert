import { Component, Output, Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { Auth } from './Auth';

@Component({
   selector: "jira",
   templateUrl: "app/assets/partials/jira.html",
   providers: [ Auth ]
})
export class Jira {
   @Output() jiraUpdate: EventEmitter<any> = new EventEmitter();
   jiraIssues: any = [];
   private url: string;
   public issueId: string;
   private headers: Headers;
   
   constructor(private http: Http,
               private auth: Auth
      ) {
      this.headers = new Headers();
      this.headers.append("Content-Type", "application/json");
      this.findAllOpenIssues().subscribe((res:any) => {
         this.jiraIssues = res.issues;
      })
   }

   doPost(url: string) {
      return this.http.post(url, {username: "jfifer@coredial.com", password: "RedSky!2012!"}, {headers: this.headers}).map((res:any)=>JSON.parse(res.json()));
   }

   getJiraIssue(id: string) {
      this.issueId = id;
      this.doPost("/api/jira/issue/"+id).subscribe((res:any)=>{
         var dn:any = {};
         dn.commonName = res.fields.customfield_10909;
         dn.emailAddress = res.fields.customfield_10913;
         dn.organizationName = res.fields.customfield_10910;
         dn.organizationalUnitName = res.fields.customfield_10908;
         dn.localityName = res.fields.customfield_10907;
         dn.stateOrProvinceName = res.fields.customfield_10906;
         dn.countryName = res.fields.customfield_10905;
      
         this.jiraUpdate.next(dn);
      });
   }

   findAllOpenIssues() {
      this.url = "/api/jira/";
      return this.http.post(this.url, {username: "jfifer@coredial.com", password: "***********"}, {headers: this.headers}).map((res:any)=>JSON.parse(res.json()));
   }
   
}

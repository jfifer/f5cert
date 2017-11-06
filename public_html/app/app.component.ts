import { Component, Input, EventEmitter } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Auth } from './classes/Auth';
import { SSL } from './classes/SSL';
import { Jira } from './classes/Jira';

@Component({
  selector: 'home',
  templateUrl: 'app/assets/partials/home.html',
  providers: [ Auth, SSL, Jira ]
})
export class AppComponent  {
   uid: any;
   data: any;
   username: string = "";
   password: string = "";
   private auth: Auth;
   private ssl: SSL;
   private jira: Jira;

   constructor(private http: Http) {
      this.auth = new Auth(this.http);
      this.ssl = new SSL(this.http);
      this.jira = new Jira(this.http, this.auth);
      this.checkAuth();
   }
 
   doClicky(res: any) {
      this.ssl.updateDN(res);
   }

   checkAuth() {
      this.auth.checkAuth().subscribe((res:any) => {
         if(parseInt(res.uid) === -1) {
            this.uid = -1;
         } else {
            this.uid = res.uid;
         }
      });
   }

   login() {
      this.auth.login(this.username, this.password).subscribe((res:any)=>{
         this.checkAuth();
      });
   }

   logout() {
      this.auth.logout().subscribe((res:any)=>{
         this.checkAuth();
      });
   }
}

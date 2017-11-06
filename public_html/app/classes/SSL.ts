import { Component, EventEmitter, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
   selector: "csr-gen",
   templateUrl: "app/assets/partials/csr-gen.html"
})
export class SSL {
   @Input() dn: FormGroup;
   private fb: FormBuilder;
   done: boolean = false;
   private url: string = "/api/ssl/";
   private headers: Headers;
   err: boolean = false;
   errMsg: string = "";

   constructor(
     private http: Http
   ) {
      this.fb = new FormBuilder();
      this.dn = this.fb.group({
         commonName: '',
         emailAddress: '',
         organizationName: '',
         organizationalUnitName: '',
         localityName: '',
         stateOrProvinceName: '',
         countryName: ''
      });
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
   }

   updateDN(res: any) {
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
   }

   parseUrlStr(obj:any) {
      return Object.keys(obj).map(function(key) {
         return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
      }).join('&'); 
   }

   generateCSR(value: any) {
      this.url = "/api/ssl/generatecsr/";
      return this.http.post(this.url, value, { headers: this.headers })
      .map((res:Response) => res.json())
      .subscribe((res:any) => {
         console.log(res);
      });
   }

   createKey(value: any) {
      this.url = "/api/ssl/createkey/";

      return this.http.post(this.url, value, { headers: this.headers }).map((res:Response) => res.json())
      .subscribe((res:any) => {
         if(!res.err) {
            this.done = true;
            this.err = false;
         } else {
            this.errMsg = res.message;
            this.err = true;
         }
      });
   }

   resetCSRForm() {
     this.done = false;
     this.err = false;
   }
}

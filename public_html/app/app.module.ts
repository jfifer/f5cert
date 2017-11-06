import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Auth } from './classes/Auth';
import { SSL } from './classes/SSL';
import { Jira } from './classes/Jira';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, Auth, SSL, Jira ],
  bootstrap:    [ AppComponent, Auth, SSL, Jira ]
})
export class AppModule { }

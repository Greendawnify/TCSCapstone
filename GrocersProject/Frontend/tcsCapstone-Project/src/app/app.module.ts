import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmployeeComponent } from './employee/employee.component';
import { AdminComponent } from './admin/admin.component';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AdminComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    FormsModule, HttpClient, NgForm
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}

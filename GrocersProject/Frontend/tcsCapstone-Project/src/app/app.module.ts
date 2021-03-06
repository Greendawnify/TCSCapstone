import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmployeeComponent } from './employee/employee.component';
import { AdminComponent } from './admin/admin.component';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAuthGuard } from './authGuardUser';
import { EmployeeAuthGuard } from './employeeAuthGuard';
import { AdminAuthGuard } from './adminAuthGuard';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';










@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
   
    

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
    FormsModule, HttpClientModule,NgbModule,BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),ToastrModule.forRoot()     
  ],
  providers: [UserAuthGuard, EmployeeAuthGuard, AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}

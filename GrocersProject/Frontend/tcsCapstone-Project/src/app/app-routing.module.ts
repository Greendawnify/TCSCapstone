import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from './admin/admin.component'
import {EmployeeComponent} from './employee/employee.component'
import {UserComponent} from './user/user.component'
import {LoginComponent} from './login/login.component'
import {ProfileComponent} from './profile/profile.component'

const routes: Routes = [
  {path:"admin",component:AdminComponent},
  {path:"employee",component:EmployeeComponent},
  {path:"user",component:UserComponent},
  {path:"login",component:LoginComponent},
  {path:"profile",component:ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

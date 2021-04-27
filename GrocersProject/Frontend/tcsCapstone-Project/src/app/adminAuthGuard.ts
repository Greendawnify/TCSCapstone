import {  CanActivate } from "@angular/router";
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";



@Injectable()
export class AdminAuthGuard implements CanActivate{
    constructor(public route: Router){}

    canActivate(){
        let key = sessionStorage.getItem('adminToken');
        if(key == null){
            // we should not be on the page
            this.route.navigate(['login']);
            return false;
        }else{
            return true;
        }
    }

    
}
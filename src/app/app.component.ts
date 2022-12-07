import { HttpClient } from '@angular/common/http';
import { Component,Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
// import { Router } from '@angular/router';

import { recipeData } from './recipeData.interface'
import { UserLoginService } from './services/userLoginService.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipe-app';
  constructor(private http:HttpClient, private cookieService:CookieService,user:UserLoginService){
    http.post('http://127.0.0.1:5001/auth',{id: cookieService.get('id') , key:cookieService.get('key')}).subscribe(data => {
      if(data['login']){
        user.isLogged = true
      }
      
    })
  }
  // TODO: nake a register from and connect to server API
  
    
}

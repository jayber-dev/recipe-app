import { HttpClient } from '@angular/common/http';
import { Component,Input , OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
// import { Router } from '@angular/router';

import { recipeData } from './components/recipe-home-card/recipeData.interface'
import { UserLoginService } from './services//authServices/userLoginService.service'
import { RecipeService } from './services/recipeService/recipe-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'recipe-app';
  constructor(private http:HttpClient,
     private cookieService:CookieService,
     user:UserLoginService,
     recipeService:RecipeService,
     private renderer2:Renderer2
     )
    {
      
    
    
    http.post('http://127.0.0.1:5001/auth',{id: cookieService.get('id') , key:cookieService.get('key')}).subscribe(data => {
      if(data['login']){
        console.log(data);
        user.userShortData = {
          firstName: data['firstName'],
          lastName: data['lastName'],
          imgName: data['imgName'],
          login: true,        
        }
        user.isLogged = true
      }
      
    })
  } 

  getScrollingElement(): Element {
    return document.scrollingElement || document.documentElement;
  }

  loadMoreData(){
    console.log('im triggered'); 
  }
}

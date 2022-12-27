import { HttpClient } from '@angular/common/http';
import { Component,Input, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { UserLoginService } from 'src/app/services//authServices/userLoginService.service';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';
import { recipeData } from './recipeData.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  constructor(public user:UserLoginService,
              private recipeService:RecipeService,
              private http:HttpClient,
              public Sanitaizer: DomSanitizer,
              private location:Location
              )
    {
      
  }
  someSubscription: any;
  url: SafeUrl;
  fetchedData:any;
  paths:SafeUrl[];
  currUrl: string;

    readUrl(event: any) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
  
        reader.onload = (event: ProgressEvent) => {
          this.url = (<FileReader>event.target).result;
        };
  
        reader.readAsDataURL(event.target.files[0]);
      }
    }

    ngOnInit(){
      
        const retriveRecipes = this.http.get('http://127.0.0.1:5001/retriveRecipes').subscribe(data => {
          this.fetchedData = data
          console.log(this.fetchedData);                      
          retriveRecipes.unsubscribe()

          this.location.onUrlChange((event)=>{
            
            console.log(this.currUrl);
            if(this.currUrl === "/addRecipe" || this.currUrl === "/register"){
              window.location.reload()
            }
            this.currUrl = event
          })    
          
          
          
        })     
    }
}

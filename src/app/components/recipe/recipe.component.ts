import { HttpClient } from '@angular/common/http';
import { Component,Input, Sanitizer } from '@angular/core';
import { NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { UserLoginService } from 'src/app/services//authServices/userLoginService.service';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';
import { recipeData } from './recipeData.interface';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  recipesData:any

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

      const recieps = this.recipeService.retriveRecipes().subscribe(data => {
        this.fetchedData = data
        console.log(this.fetchedData);
        this.location.onUrlChange((event)=>{
            
              console.log(this.currUrl);
              if(this.currUrl === "/addRecipe"){
                window.location.reload()
              }
              this.currUrl = event
        
        recieps.unsubscribe()
        })
      })
        
        //   this.location.onUrlChange((event)=>{
            
        //     console.log(this.currUrl);
        //     if(this.currUrl === "/addRecipe"){
        //       window.location.reload()
        //     }
        //     this.currUrl = event
        //   })    
          
          
          
        // })     
    }
}

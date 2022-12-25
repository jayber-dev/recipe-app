import { HttpClient } from '@angular/common/http';
import { Component,Input, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserLoginService } from 'src/app/services//authServices/userLoginService.service';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';
import { recipeData } from './recipeData.interface';
@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  constructor(public user:UserLoginService,
              private recipeService:RecipeService,
              private http:HttpClient,
              public Sanitaizer: DomSanitizer
              )
    {
    
  }
  url: SafeUrl;
  fetchedData:any
  paths:Sanitizer

  @Input()
  imgData: recipeData[]= [
    {
    imgUrl:'../../assets/images/salmon-518032_1280.jpg',
    title: 'מנת דג סלמון גורמה'
    },
    {
    imgUrl:'../../assets/images/highway-7542272_1920.jpg',
    title:'טעם הררי וחולי מנת גורמה לכל ילד בגן',
    },
    {
    imgUrl:'../../assets/images/asparagus-2169305_1920.jpg',
    title:'טעים טעים',
    },
    {
    imgUrl:'../../assets\\images\\pancakes-1984716_1920.jpg',
    title:'מאפה לקפה ומיד לשירותים',
    },
    {
    imgUrl:'../../assets/images/pasta-3547078_1920.jpg',
    title:'פסטה לה ויסטה בייבי',
    },
    {
    imgUrl:'../../assets/images/pizza-329523_1920.jpg',
    title:"איטלקית מעודנת פיצה לצבי הנינג'ה",
    },]

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
          console.log(this.Sanitaizer.bypassSecurityTrustResourceUrl(this.fetchedData[0]['img']));
          
          // for(let i =0;i < this.fetchedData.length; i++){
          //   this.paths.push(this.Sanitaizer.bypassSecurityTrustResourceUrl(`${this.fetchedData[i].img}`));
            
          // }
          // console.log(data);    
          retriveRecipes.unsubscribe()
        })
      
      
    }
}

import { Component,OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';
import { ActivatedRoute} from '@angular/router'
import { recipeDetails } from './recipeDetails.interface';
import { toArray } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { UserLoginService } from 'src/app/services/authServices/userLoginService.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  constructor(
    private recipeService:RecipeService,
    private activatedRoute:ActivatedRoute,
    private cookieService:CookieService,
    private http:HttpClient,
    private user:UserLoginService
    ) {
      console.log('im reloding the component');
      
      // http.post('http://127.0.0.1:5001/auth',{id: cookieService.get('id') , key:cookieService.get('key')}).subscribe(data => {
      //   if(data['login']){
      //     console.log(data);
      //     user.userShortData = {
      //       firstName: data['firstName'],
      //       lastName: data['lastName'],
      //       imgName: data['imgName'],
      //       login: true,        
      //     }
      //     user.isLogged = true
      //   }
        
      // })
  }

  param:any
  recipeDetails:any
  cookingSteps:string[]
  ingredients:string[]

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(param => {
      console.log(param);  
      this.param = param
    })

    console.log(this.param);
    
    const recipeDetails = this.recipeService.retriveRecipe(this.param.id).subscribe(data => {
      console.log(data);
      this.recipeDetails = data;
      
      this.cookingSteps = (JSON.parse(this.recipeDetails.cookingSteps));
      this.ingredients = (JSON.parse(this.recipeDetails.ingredients))
      recipeDetails.unsubscribe()
    })
  }
}

import { Component,OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';
import { ActivatedRoute} from '@angular/router'
import { recipeDetails } from './recipeDetails.interface';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  constructor(
    private recipeService:RecipeService,
    private activatedRoute:ActivatedRoute) {

  }

  param:any
  recipeDetails:any
  ingredients:any

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      console.log(param);  
      this.param = param
    })

    console.log(this.param);
    
    const recipeDetails = this.recipeService.retriveRecipe(this.param.id).subscribe(data => {
      // console.log(data);
      
      this.recipeDetails = data;
      this.ingredients = this.recipeDetails.ingredients;
      const parsed = JSON.parse(this.ingredients)
      console.log(parsed);
      
      
      
      
      recipeDetails.unsubscribe()
    })
  }
}

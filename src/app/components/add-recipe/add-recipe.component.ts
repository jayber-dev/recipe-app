import { Component, SecurityContext } from '@angular/core';
import { FormGroup,FormBuilder,FormArray, Validators, } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';
import { AddRecipeForm } from './addRecipe.interface';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent {

  addRecipe: FormGroup
  SecurityContext: any;
  url:SafeUrl;
  ingredients:string[] = [];
  stepsArray:string[] = []
  toSend: AddRecipeForm

  constructor(fb:FormBuilder, public Sanitaizer:DomSanitizer,private router:Router,private recipeService:RecipeService){
    this.addRecipe = fb.group({
      title: '',
      cookingTime: '',
      primaryImage: '',
      ingredient:['', Validators.required],
      steps: '',
    })
  }

  addIngredient(){
    this.ingredients.push(this.addRecipe.get('ingredient').value)
    this.addRecipe.controls['ingredient'].setValue('')
    this.addRecipe.controls['ingredient'].markAsUntouched()
  }

  addStep(){
    this.stepsArray.push(this.addRecipe.get('steps').value)
    this.addRecipe.controls['steps'].setValue('')
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onSubmit(){
    this.toSend = {
      title: this.addRecipe.get('title').value,
      cookingTime:this.addRecipe.get('cookingTime').value,
      img:this.addRecipe.get('primaryImage').value,
      ingredients:this.ingredients,
      cookingSteps:this.stepsArray,
    }

    console.log('thank you for your submission');
    console.log(this.addRecipe.value);
    this.recipeService.addRecipe(this.toSend)
    this.router.navigate(['/'])
  }
}

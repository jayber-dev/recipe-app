import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormArray, } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent {

  addRecipe: FormGroup

  constructor(fb:FormBuilder, public Sanitaizer:DomSanitizer){
    this.addRecipe = fb.group({
      title: '',
      cookingTime: '',
      primaryImage: '',
      ingredient:'',
      steps: '',
    })
  }

  onSubmit(){
    console.log('thank you for your submission');
    
  }
}

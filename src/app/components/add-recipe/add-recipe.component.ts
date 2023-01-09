import { Component, SecurityContext } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';
import { RecpieModel } from './addRecipe.interface';
import { UserLoginService } from 'src/app/services/authServices/userLoginService.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})

export class AddRecipeComponent {
  addRecipe: FormGroup;
  SecurityContext: any;
  url: SafeUrl;
  ingredients: any[] = [];
  stepsArray: string[] = [];
  toSend: RecpieModel;
  fileName:string;
  fileData:FormData = new FormData()
  toPush: any;
 

  constructor(
    fb: FormBuilder,
    public Sanitaizer: DomSanitizer,
    private router: Router,
    private recipeService: RecipeService,
    private user:UserLoginService
  ) {
    this.addRecipe = fb.group({
      title: ['', Validators.required],
      cookingTime: ['', Validators.required],
      primaryImage: ['', Validators.required],
      ingredient: ['', Validators.required],
      quantity: ['', Validators.required],
      unit: ['', Validators.required],
      steps: '',
    });
  }

  addIngredient() {
    this.ingredients.push({ingredient : this.addRecipe.get('ingredient').value,
                          quantity: this.addRecipe.get('quantity').value,
                          unit: this.addRecipe.get('unit').value});
 
    console.log(this.addRecipe.get('ingredient').value)
    this.addRecipe.controls['ingredient'].setValue('');
    this.addRecipe.controls['quantity'].setValue('')
    this.addRecipe.controls['unit'].setValue('')
    this.addRecipe.controls['ingredient'].markAsUntouched();
  }

  deleteItem(itemId) {
    this.ingredients.splice(itemId, 1)
    
    
  }
  deleteStepItem(itemId) {
    this.stepsArray.splice(itemId, 1)
  
    
  }

  addStep() {
    this.stepsArray.push(this.addRecipe.get('steps').value);
    this.addRecipe.controls['steps'].setValue('');
  }

  readUrl(event: any) {
    const file:File = event.target.files[0]
    
    if(file){
      this.fileName = file.name;
      this.fileData.append('file',file)
    }
    
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;    
           
      };

      reader.readAsDataURL(event.target.files[0]);
          
    }
  }
  async onSubmit() {
    
    this.toSend = {
      title: this.addRecipe.get('title').value,
      cookingTime: this.addRecipe.get('cookingTime').value,
      img: this.fileName,
      ingredients: this.ingredients,
      cookingSteps: this.stepsArray,
    };
    this.recipeService.recipesList.push(this.toSend);   
    this.recipeService.fileUpload(this.fileData); // calls to upload images
    this.recipeService.addRecipe(this.toSend); // calls to add recipe in DB
    this.router.navigateByUrl('/home'); // navigates to home page
  }
}

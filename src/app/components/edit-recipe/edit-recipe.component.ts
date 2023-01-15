import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  constructor(
    private activatedRoute:ActivatedRoute,
    private recipeService:RecipeService,
    private fb:FormBuilder,
    ){
      this.editRecipeForm = fb.group({
        title: ["", Validators.required],
      preperationTime: ["", Validators.required],
      cookingTime: ["", Validators.required],
      primaryImage: [""],
      ingredient: ["", Validators.required],
      quantity: ["", Validators.required],
      unit: ["", Validators.required],
      steps: "",
      })
    
  }
  ingredients: any[] = [];
  editRecipeForm: FormGroup
  ingredientsList:string[]
  cookingSteps:string[]
  fileName:string;
  fileData:FormData = new FormData()
  stepsArray: string[] = [];
  url: SafeUrl;
  SecurityContext: any;

  addStep() {
    this.cookingSteps.push(this.editRecipeForm.get('steps').value);
    this.editRecipeForm.controls['steps'].setValue('');
    console.log(this.stepsArray);
  }

  readUrl(event){
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
      console.log(this.fileName);
      
    }
  }

  addIngredient() {
    this.ingredients.push({ingredient : this.editRecipeForm.get('ingredient').value,
                          quantity: this.editRecipeForm.get('quantity').value,
                          unit: this.editRecipeForm.get('unit').value});
 
    console.log(this.editRecipeForm.get('ingredient').value)
    this.editRecipeForm.controls['ingredient'].setValue('');
    this.editRecipeForm.controls['quantity'].setValue('')
    this.editRecipeForm.controls['unit'].setValue('')
    this.editRecipeForm.controls['ingredient'].markAsUntouched();
  }

  onSubmit(){

  }


  ngOnInit():void {
    this.activatedRoute.params.subscribe(param => {
      console.log(param['id']);
      this.recipeService.retriveRecipe(param['id']).subscribe(data => {
        console.log(data);
        this.ingredients = JSON.parse(data['ingredients'])
        this.cookingSteps = JSON.parse(data['cookingSteps'])
        this.editRecipeForm.get('title').setValue(data['title'])
        this.editRecipeForm.get('preperationTime').setValue(data['preperationTime'])
        this.editRecipeForm.get('cookingTime').setValue(data['cookingTime'])
        this.editRecipeForm.get('cookingTime').setValue(data['cookingTime'])
      })
      
    })
  }
}


// TODO: fix the edit recipe component
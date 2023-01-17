import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';

@Component({
  selector: 'app-user-recipe-card',
  templateUrl: './user-recipe-card.component.html',
  styleUrls: ['./user-recipe-card.component.scss']
})
export class UserRecipeCardComponent implements OnInit {
  constructor(
    private userRecipes:RecipeService,
    private router:Router,
    ){

  }
  userRecipesStringData:any
  userRecipesObjectData:any = []
  steps:string[]
  ingredients:string[]

  editRecipe(id){
    console.log(id);
    this.router.navigateByUrl('/editRecipe/' + id)
  }

  deleteRecipe(recipeId:number,index: number){
    if(confirm('are you sure you want to delete')){
      this.userRecipes.deleteRecipe(recipeId).subscribe(data => {
        // console.log(data);
      })
      this.userRecipesObjectData.splice(index, 1)
    }
    
  }

  ngOnInit(): void {
    const UserData = this.userRecipes.retriveUserRecipes().subscribe(data => {
      
      this.userRecipesStringData = data;
      this.userRecipesStringData.forEach((elem) => {
        const steps = JSON.parse(elem.cookingSteps);
        const ingredients = JSON.parse(elem.ingredients)
        
        this.userRecipesObjectData.push({
          title: elem['title'],
          cookingTime: elem['cookingTime'],
          profileImg: elem['profile-img'],
          recipeImg: elem['recipe-img'],
          recipeId: elem['recipeId'],
          userFirstName: elem['userFirstName'],
          userlastName: elem['userlastName'],
          userId: elem['userId'],
          ingredients:ingredients,
          cookingSteps:steps
        })
      });
      // console.log(this.userRecipesObjectData);
      
      UserData.unsubscribe()
    })
  }
}

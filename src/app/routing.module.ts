import {Routes , RoutesRecognized} from '@angular/router'
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component'
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component'

import { RecipeComponent } from './components/recipe-home-card/recipe.component'
import { RegistrationFormComponent } from './components/registration-form/registration-form.component'
import { UserRecipeCardComponent } from './components/user-recipe-card/user-recipe-card.component'

export const routes:Routes = [
    {path: 'home', component:RecipeComponent},
    {path: '' , redirectTo:'/home',pathMatch:"full"},
    {path: 'register', component:RegistrationFormComponent},
    {path: 'addRecipe', component:AddRecipeComponent},
    {path: 'home/recipeDetails/:id', component:RecipeDetailsComponent},
    {path: 'myRecipes', component:UserRecipeCardComponent},
    {path: 'editRecipe/:id', component:EditRecipeComponent},
    {path: '**' , component:NotFoundComponent }
]
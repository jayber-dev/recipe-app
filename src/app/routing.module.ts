import {Routes , RoutesRecognized} from '@angular/router'
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component'

import { RecipeComponent } from './components/recipe/recipe.component'
import { RegistrationFormComponent } from './components/registration-form/registration-form.component'

export const routes:Routes = [
    {path: 'home', component:RecipeComponent},
    {path: '' , redirectTo:'/home',pathMatch:"full"},
    {path: 'register', component:RegistrationFormComponent},
    {path: 'addRecipe', component:AddRecipeComponent},
    {path: 'home/recipeDetails/:id', component:RecipeDetailsComponent},
    {path: '**' , component:NotFoundComponent }
]
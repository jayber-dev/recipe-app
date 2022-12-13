import {Routes} from '@angular/router'
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component'
import { NotFoundComponent } from './components/not-found/not-found.component'

import { RecipeComponent } from './components/recipe/recipe.component'
import { RegistrationFormComponent } from './components/registration-form/registration-form.component'

export const routes:Routes = [
    {path: 'home', component:RecipeComponent},
    {path: '' , redirectTo:'/home',pathMatch:"full"},
    {path: 'register', component:RegistrationFormComponent},
    {path: 'addRecipe', component:AddRecipeComponent},
    {path: '**' , component:NotFoundComponent }
]
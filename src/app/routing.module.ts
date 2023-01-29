import {Routes , RoutesRecognized} from '@angular/router'
import { AddRecipeComponent } from './components/recipesComponents/add-recipe/add-recipe.component'
import { EditRecipeComponent } from './components/recipesComponents/edit-recipe/edit-recipe.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { RecipeDetailsComponent } from './components/recipesComponents/recipe-details/recipe-details.component'

import { RecipeComponent } from './components/recipesComponents/recipe-home-card/recipe.component'
import { RegistrationFormComponent } from './components/authComponents/registration-form/registration-form.component'
import { UserRecipeCardComponent } from './components/recipesComponents/user-recipe-card/user-recipe-card.component'
import { UserDetailsComponent } from './components/settingsComponents/user-details/user-details.component'
import { SettingsComponent } from './components/settingsComponents/settingsMain/settings.component'

export const routes:Routes = [
    {path: 'home', component:RecipeComponent},
    {path: '' , redirectTo:'/home',pathMatch:"full"},
    {path: 'register', component:RegistrationFormComponent},
    {path: 'addRecipe', component:AddRecipeComponent},
    {path: 'recipeDetails/:id', component:RecipeDetailsComponent},
    {path: 'myRecipes', component:UserRecipeCardComponent},
    {path: 'editRecipe/:id', component:EditRecipeComponent},
    {path: 'settings', component:SettingsComponent},
    {path: '**' , component:NotFoundComponent }
]
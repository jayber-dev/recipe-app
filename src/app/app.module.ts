import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeComponent } from './components/recipe-home-card/recipe.component';
import { routes } from './routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserLoginService } from './services//authServices/userLoginService.service';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { CookieService } from 'ngx-cookie-service';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { RecipeService } from './services/recipeService/recipe-service.service';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { UserRecipeCardComponent } from './components/user-recipe-card/user-recipe-card.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipeComponent,
    LoginComponent,
    RegistrationFormComponent,
    AddRecipeComponent,
    SafeUrlPipe,
    RecipeDetailsComponent,
    UserRecipeCardComponent,
    EditRecipeComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [
    PathLocationStrategy,
    UserLoginService,
    RecipeService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

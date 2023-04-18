import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbarComponents/navbar/navbar.component';
import { RecipeComponent } from './components/recipesComponents/recipe-home-card/recipe.component';
import { routes } from './routing.module';
import { LoginComponent } from './components/navbarComponents/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserLoginService } from './services//authServices/userLoginService.service';
import { RegistrationFormComponent } from './components/authComponents/registration-form/registration-form.component';
import { CookieService } from 'ngx-cookie-service';
import { AddRecipeComponent } from './components/recipesComponents/add-recipe/add-recipe.component';
import { RecipeService } from './services/recipeService/recipe-service.service';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { RecipeDetailsComponent } from './components/recipesComponents/recipe-details/recipe-details.component';
import { UserRecipeCardComponent } from './components/recipesComponents/user-recipe-card/user-recipe-card.component';
import { EditRecipeComponent } from './components/recipesComponents/edit-recipe/edit-recipe.component';
import { LikesDisplayComponent } from './components/likesComponents/likes-display/likes-display.component';
import { LikeBtnComponent } from './components/likesComponents/like-btn/like-btn.component';
import { LikeService } from './services/likeService/likeService.Service';
import { PaypalQrComponent } from './components/paypalComponent/paypal-qr/paypal-qr.component';
import { PaypalBtnComponent } from './components/paypalComponent/paypal-btn/paypal-btn.component';
import { PricesTableComponent } from './components/prices-table/prices-table.component';
import { HtmlDecoder } from './pipes/htmlDecoder.pipe';
import { UserDetailsComponent } from './components/settingsComponents/user-details/user-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipeComponent,
    LoginComponent,
    RegistrationFormComponent,
    AddRecipeComponent,
    SafeUrlPipe,
    HtmlDecoder,
    RecipeDetailsComponent,
    UserRecipeCardComponent,
    EditRecipeComponent,
    LikesDisplayComponent,
    LikeBtnComponent,
    PaypalQrComponent,
    PaypalBtnComponent,
    PricesTableComponent,
    UserDetailsComponent, 
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
    LikeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

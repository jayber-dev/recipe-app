import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { routes } from './routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserLoginService } from './services/userLoginService.service';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipeComponent,
    LoginComponent,
    RegistrationFormComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient } from '@angular/common/http';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { UserLoginService } from 'src/app/userLoginService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private user:UserLoginService,private http:HttpClient){
    this.isLogged = user.isLogged
  }

  email:string = '';
  password:string = '';
  isLogged:boolean

  sendLogin() {
    console.log(`login was pressed with credentials \n 
email: ${this.email}\n
password: ${this.password}` ); 
    let isToChange = this.user.validate(this.email,this.password)
    console.log(isToChange);
  }

  
}

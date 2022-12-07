import { Component, Output, Input, EventEmitter } from '@angular/core';
import { UserLoginService } from 'src/app/services/userLoginService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private user:UserLoginService,){
    this.isLogged = user.isLogged
  }

  email:string = '';
  password:string = '';
  isLogged:boolean

  sendLogin() {
    console.log(`login was pressed with credentials \n 
    email: ${this.email}\n
    password: ${this.password}` ); 
    this.user.login(this.email,this.password)  
    console.log('after server validation')
  }

  
}

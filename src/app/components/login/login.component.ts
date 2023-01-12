import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/authServices/userLoginService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    public user:UserLoginService,
    private router:Router,
    ){
    this.isLogged = user.isLogged
  }

  email:string = '';
  password:string = '';
  isLogged:boolean;
  message:string;

  sendLogin() {
    console.log(`login was pressed with credentials \n 
    email: ${this.email}\n
    password: ${this.password}` ); 
    this.user.login(this.email,this.password) 
    
    if(this.isLogged = true){
      this.router.navigateByUrl('/home')
    }
    
    console.log('after server validation')
  }

  
}

import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/authServices/userLoginService.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    public user:UserLoginService,
    private router:Router,
    private cookieService:CookieService
    ){
    this.isLogged = user.isLogged
  }

  email:string = '';
  password:string = '';
  isLogged:boolean;
  message:string;
  userShortData:any;
  @Output() event = new EventEmitter();
  
  sendLogin() {
    // console.log(`login was pressed with credentials \n 
    // email: ${this.email}\n
    // password: ${this.password}` ); 
    this.user.login(this.email,this.password)
    .subscribe((data) => {
      if (data['data'] == true) {
        this.isLogged = true;       
        this.cookieService.set('key', data['token'],1);  
        console.log(data);
        
        this.userShortData = {
          firstName: data['firstName'],
          lastName: data['lastName'],
          imgName: data['imgName'],
          login: true,        
        }  
        this.event.emit(this.userShortData)
        
      } else {
        this.isLogged = false;
        this.message = data['message']
      }
    })
    
    // if(this.user.isLogged == true){
    //   console.log(this.isLogged);
    //   this.isLogged = this.user.isLogged
    //   console.log(this.isLogged);
      
    //   this.event.emit(this.user.isLogged)
    //   this.router.navigateByUrl('/home')
    // }
    
    console.log('after server validation')
  }

  
}

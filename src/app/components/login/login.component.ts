import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email:string = '';
  password:string = '';
  isLogged:boolean
  

  sendLogin() {
    console.log(`login was pressed with credentials \n 
email: ${this.email}\n
password: ${this.password}` );
    this.user.getData(this.email,this.password)
  // http.post('http://127.0.0.1:5001/auth',{name:this.email,password:this.password},{responseType:'json'}).subscribe((data) => {
    // console.log(data);
  // })
  }

  constructor(private user:UserAuthService,private http:HttpClient){
    this.isLogged = user.isLogged
  }
}

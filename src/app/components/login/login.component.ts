import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email:string = '';
  password:string = '';

  sendLogin() {
    console.log(`login was pressed with credentials \n 
email: ${this.email}\n
password: ${this.password}` );
  }
}

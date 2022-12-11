import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup, FormBuilder } from '@angular/forms'
import { UserLoginService } from 'src/app/services/userLoginService.service';
import { countries } from './countries';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {

  constructor(private fromBuilder:FormBuilder,private user:UserLoginService) {

  }
  countries:any[] = countries 
  // firstName = new FormControl('')
  // lastName = new FormControl('')

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    country: new FormControl(''),
    pass: new FormControl(''),
    passRepeat: new FormControl('')

  })

  onSubmit() {
    this.user.register(this.registerForm.value)
  }
  
  onInit(){

  }
  
}

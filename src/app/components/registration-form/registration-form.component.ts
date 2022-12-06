import { Component } from '@angular/core';
import { FormControl,FormGroup, FormBuilder } from '@angular/forms'
import { countries } from './countries';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {

  constructor(private fromBuilder:FormBuilder) {

  }
  countries:any[] = countries 
  // firstName = new FormControl('')
  // lastName = new FormControl('')

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    country: new FormControl('')

  })

  onSubmit() {
    console.log(this.registerForm.value)
    console.log(countries)
  }
  
 
  
}

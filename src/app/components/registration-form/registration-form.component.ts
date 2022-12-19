import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UserLoginService } from 'src/app/services/authServices/userLoginService.service';
import { countries } from './countries';
import { passwordsMatch } from './passwordsMatch.directive';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {

  constructor(
    private formBuilder:FormBuilder,
    private user:UserLoginService,
    private router:Router
    
    ) {
    this.registerForm = formBuilder.group({
      firstName: ['',Validators.required] ,
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      country: [''],
      pass: ['', [Validators.minLength(10),Validators.required]],
      passRepeat: ['',Validators.minLength(10)],
    },{validators: passwordsMatch})
  }
  registerForm: FormGroup
  countries:any[] = countries 

  
  

  onSubmit() {
    console.log(this.registerForm.get('firstName').value);
    console.log(this.registerForm.errors)
    this.registerForm.controls['firstName'].valid
    if(this.registerForm.valid){
        this.user.register(this.registerForm.value)
        this.router.navigate(['/'])
      
    }
  }
  
  onInit(): void{
    
    this.registerForm.controls['email'].valid
  }
  
}

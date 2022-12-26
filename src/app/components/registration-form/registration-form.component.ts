import { Component,OnInit, Sanitizer } from '@angular/core';
import { FormControl,FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UserLoginService } from 'src/app/services/authServices/userLoginService.service';
import { countries } from './countries';
import { passwordsMatch } from './passwordsMatch.directive';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { userData } from './userData.interface';



@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {

  constructor(
    private formBuilder:FormBuilder,
    private user:UserLoginService,
    private router:Router,
    public sanitaizer:DomSanitizer
    
    ) {
    this.registerForm = formBuilder.group({
      firstName: ['',Validators.required] ,
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      country: [''],
      img: [''],
      pass: ['', [Validators.minLength(10),Validators.required]],
      passRepeat: ['',Validators.minLength(10)],
    },{validators: passwordsMatch})
  }
  
  registerForm: FormGroup;
  countries:any[] = countries;
  fileName:string;
  fileUrl:SafeUrl;
  fileData:FormData = new FormData();
  toSend:userData 

  readUrl(event:any){
    const file:File = event.target.files[0]
    console.log(file);
    
    if(file){
      this.fileName = file.name;
      // const formData = new FormData();
      this.fileData.append('file',file)
      // this.recipeService.fileUpload(formData)
    }

    
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.fileUrl = (<FileReader>event.target).result;           
      };
      reader.readAsDataURL(event.target.files[0]);         
    }
    
    
  }
  

  onSubmit() {
    // console.log(this.registerForm.get('firstName').value);
    // console.log(this.registerForm.errors)
    console.log(this.fileData);
    console.log(this.registerForm.value);
    this.registerForm.controls['img']
    this.toSend = {
      country: this.registerForm.controls['country'].value,
      email: this.registerForm.controls['email'].value,
      firstName: this.registerForm.controls['firstName'].value,
      lastName: this.registerForm.controls['lastName'].value,
      password: this.registerForm.controls['pass'].value,
      imgName: this.fileName
    }
    
    
    this.registerForm.controls['firstName'].valid
    if(this.registerForm.valid){
        this.user.uploadProfileImg(this.fileData)
        this.user.register(this.toSend)
        this.router.navigate(['/'])
      
    }
  }
  
  onInit(): void{
    
    this.registerForm.controls['email'].valid
  }
  
}

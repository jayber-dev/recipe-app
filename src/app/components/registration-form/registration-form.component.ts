import { Component } from '@angular/core';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  firstName = new FormControl('')
  lastName = new FormControl('')
 
  // valuechange(){
  //   this.name.value
  // }
}

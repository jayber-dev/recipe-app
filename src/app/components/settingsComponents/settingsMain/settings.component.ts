import { Component } from '@angular/core';
import { UserLoginService } from 'src/app/services/authServices/userLoginService.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor(
    private user:UserLoginService,
  ){

  }
  ngOnInit() {
    
  }
}

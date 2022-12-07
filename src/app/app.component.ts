import { HttpClient } from '@angular/common/http';
import { Component,Input } from '@angular/core';
import { recipeData } from './recipeData.interface'
import { UserLoginService } from './services/userLoginService.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipe-app';
  constructor(private http:HttpClient){
    http.post('http://127.0.0.1:5001/auth',{}).subscribe(data => {
      console.log('wow');
      
    })
  }
  // TODO: nake a register from and connect to server API
  // TODO: make user islogged on first load
    


}

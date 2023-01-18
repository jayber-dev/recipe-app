import { Component,inject,Injectable,Injector,Input,OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserLoginService } from 'src/app/services//authServices/userLoginService.service';
import { RecipeComponent } from '../../recipesComponents/recipe-home-card/recipe.component';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  
  constructor(
    public user:UserLoginService,
    private cookieService:CookieService,
    private http:HttpClient,
    private router:Router
    ) {
    http.post('http://127.0.0.1:5001/auth',{id: cookieService.get('id') , key:cookieService.get('key')}).subscribe(data => {
        if(data['login']){
          console.log(data);
          user.userShortData = {
            firstName: data['firstName'],
            lastName: data['lastName'],
            imgName: data['imgName'],
            login: true,        
          }
          user.isLogged = true
        }
        
      })
  }
  home:boolean
  showModal:boolean
  effect: any = [{height:'0px'},{height:'500px'}]
  
 
  modalView(event: Event) {
    
    if(!this.showModal){
      this.showModal = true
    } else {
      this.showModal = false
    }
  }

  logout(){
    this.user.logout()
    this.router.navigateByUrl('/home')
  }
 

  ngOnInit(): any {
    // throw new Error('Method not implemented.');
  }
}

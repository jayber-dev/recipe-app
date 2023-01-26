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
    private router:Router
    ) {

  }

  @Input() isLogged:boolean
  @Input() userData:any
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
    this.isLogged = false
    this.router.navigateByUrl('/home')
  }
 
  isLoggedEvent(e: boolean){
    console.log(e);
    this.userData = e
    this.isLogged = e['login']
  }

  ngOnInit(): any {
    // throw new Error('Method not implemented.');
  }
}

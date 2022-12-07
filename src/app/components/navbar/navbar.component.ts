import { Component,inject,Injectable,Injector,Input,OnInit, Output} from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/userLoginService.service';
import { RecipeComponent } from '../recipe/recipe.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  
  constructor(public user:UserLoginService) {
    if(!user?.isLogged) {
      console.log(user.isLogged)
      // this.showModal = false
    }
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
  }
 

  ngOnInit(): any {
    
    // throw new Error('Method not implemented.');
  }
}

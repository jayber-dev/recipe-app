import { Component,Input,OnInit, Output} from '@angular/core';
import { UserLoginService } from 'src/app/userLoginService.service';
import { RecipeComponent } from '../recipe/recipe.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  
  constructor(public user:UserLoginService) {
  }
  
  showModal:boolean = false;
  effect: any = [{height:'0px'},{height:'500px'}]
  
 
  modalView(event: Event) {
    
    if(!this.showModal){
      this.showModal = true
    } else {
      this.showModal = false
    }
  }

  

  

  ngOnInit(): any {
    
    // throw new Error('Method not implemented.');
  }
}

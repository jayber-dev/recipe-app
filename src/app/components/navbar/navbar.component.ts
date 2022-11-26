import { Component,OnInit} from '@angular/core';
import { RecipeComponent } from '../recipe/recipe.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
 
  email:string = '';
  password:string = '';
  showModal:boolean = false;
  effect: any = [{height:'0px'},{height:'500px'}]
  
  takeEffect(){
    console.log(document.querySelector('.login-modal'))
    document.querySelector('.login-modal')?.animate(this.effect,200)
  }
  modalView(event: Event) {
    
    if(!this.showModal){
      this.showModal = true
      console.log(document.querySelector('.login-modal'))
      this.takeEffect()
    } else {
      this.showModal = false
    }
    
    // console.log(document.querySelector('nav')?.animate(this.effect,200))
    console.log('wow ' + this.showModal);
  }

  sendLogin() {
    console.log(`login was pressed with credentials \n 
email: ${this.email}\n
password: ${this.password}` );
  }

  constructor() {
    console.log(document.querySelector('.login-modal'))

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}

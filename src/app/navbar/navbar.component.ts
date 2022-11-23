import { Component,OnInit} from '@angular/core';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  wow() {
    console.log('kaka');
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}

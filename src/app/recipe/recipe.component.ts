import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  @Input() src:string ='';
  @Input() Description:string ='';
  
}

import { Component,Input } from '@angular/core';
import { LikeService } from 'src/app/services/likeService/likeService.Service';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';

@Component({
  selector: 'app-like-btn',
  templateUrl: './like-btn.component.html',
  styleUrls: ['./like-btn.component.scss']
})
export class LikeBtnComponent {
  constructor(
    private likeService:LikeService,
    private recipeService:RecipeService){

  }

  @Input() recipeId:string

  addLike(){
    console.log('i was clicked');
    console.log(this.recipeId);
    
    this.likeService.addLike().subscribe(data => {
      console.log(data); 
    })
    
  }
}

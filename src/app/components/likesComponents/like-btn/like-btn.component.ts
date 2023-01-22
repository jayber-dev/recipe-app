import { Component,Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserLoginService } from 'src/app/services/authServices/userLoginService.service';
import { LikeService } from 'src/app/services/likeService/likeService.Service';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';

@Component({
  selector: 'app-like-btn',
  templateUrl: './like-btn.component.html',
  styleUrls: ['./like-btn.component.scss']
})
export class LikeBtnComponent implements OnInit {
  constructor(
    private likeService:LikeService,
    private recipeService:RecipeService,
    public user:UserLoginService,
    private cookieService:CookieService){

  }

  @Input() recipeId:string
  @Input() userId:string
  isLiked:boolean

  addLike(){
    console.log('i was clicked');
    console.log(this.recipeId);
    console.log(this.user.userData);
    this.likeService.addLike(this.recipeId).subscribe(data => {
      // console.log(data); 
      if(data['data'] === true){
        this.isLiked = true
      } else {
        this.isLiked = false
      }
    })
    
    
  }

  ngOnInit(): void {
    try {
      this.likeService.checkIfPressed(this.recipeId).subscribe(data => {
        console.log(data);
        if(data['data'] === true){
          this.isLiked = true
        } else {
          this.isLiked = false
        }
      })
    } catch {
      console.log('wow');
    }
  }
}

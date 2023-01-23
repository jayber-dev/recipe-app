import { Component,Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserLoginService } from 'src/app/services/authServices/userLoginService.service';
import { LikeService } from 'src/app/services/likeService/likeService.Service';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';
import { HttpClient } from '@angular/common/http'

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
    private cookieService:CookieService,
    private http:HttpClient
    ){
    
    }

  @Input() recipeId:string
  @Input() userId:string
  isLiked:string
  logged:boolean

  likeStyle(){
    if(this.isLiked == 'green'){
      return {'fill':this.isLiked, 'rotate':'-30deg'}
    } 
    return {'fill':this.isLiked, 'rotate':'0deg'}
  }

  addLike(){
    this.likeService.addLike(this.recipeId).subscribe(data => {
      // console.log(data); 
      if(data['data'] === true){
        this.isLiked = 'green'
      } else {
        this.isLiked = 'black'
      }
    })
    
    
  }

  ngOnInit(): void {
    const cookie = this.cookieService.check('key')
    console.log(cookie);
    
    this.logged = cookie
    console.log(this.logged);
    if(this.logged) this.isLiked = "black"
    
    
    try {
      this.likeService.checkIfPressed(this.recipeId).subscribe(data => {
        console.log(data);
        if(data['data'] === true){
          this.isLiked = 'green'
        } else {
          this.isLiked = 'black'
        }
      })
    } catch {
      console.log('wow');
    }
  }
}

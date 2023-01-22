import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
  })

export class LikeService {
    constructor(
        private http:HttpClient,
        private cookieService:CookieService,
        ){

    }

    addLike(recipeId){
        console.log(recipeId);
        return this.http.post('http://127.0.0.1:5001/addLike',{recipe_id:recipeId, key:this.cookieService.get('key')})
    }

    checkIfPressed(recipeId){
        console.log(recipeId);
        return this.http.get('http://127.0.0.1:5001/checkLike', {params:{recipeId:recipeId,key:this.cookieService.get('key')}})
    }
}
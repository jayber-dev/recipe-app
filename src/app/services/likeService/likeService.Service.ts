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

    domain:String = 'http://127.0.0.1'
    port:string = '5000'

    addLike(recipeId){
        console.log(recipeId);
        return this.http.post(`${this.domain}:${this.port}/addLike`,{recipe_id:recipeId, key:this.cookieService.get('key')})
    }

    checkIfPressed(recipeId){
        console.log(recipeId);
        return this.http.get(`${this.domain}:${this.port}/checkLike`, {params:{recipeId:recipeId,key:this.cookieService.get('key')}})
    }
}
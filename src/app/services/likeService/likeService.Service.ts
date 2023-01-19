import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
@Injectable({
    providedIn: 'root',
  })

export class LikeService {
    constructor(private http:HttpClient){

    }

    addLike(){
        return this.http.post('http://127.0.0.1:4200/addLike',{})
    }
}
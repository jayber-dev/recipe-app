import { HttpClient } from '@angular/common/http';
import { Injectable, ɵɵresolveBody } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  isLogged:boolean = false

  getData(user:string,pass:string){
    this.http.post('http://127.0.0.1:5001/auth',{name:user,pass:pass},{responseType:'json'}).subscribe((data) =>{
    console.log(data['data']);
      if(data['data'] == 'true'){
        this.isLogged = true
      }
    })
  }
  constructor(private http:HttpClient) { }
}

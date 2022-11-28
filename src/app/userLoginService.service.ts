import { HttpClient } from '@angular/common/http';
import { Injectable, Input, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http:HttpClient) {
    
  }
  isLogged:boolean = true

  validate(user:string,pass:string){
    this.http.post<any>('http://127.0.0.1:5001/auth',{name:user,pass:pass},{responseType:'json'}).subscribe((data) =>{
    
      if(data['data'] == 'true'){
        return this.isLogged = false
      }
      return this.isLogged = true
    })
  }
  
}

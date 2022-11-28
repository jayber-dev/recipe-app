import { HttpClient } from '@angular/common/http';
import { Injectable, Input, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http:HttpClient) {
    
  }
  isLogged:boolean = true
  message:string

  validate(user:string,pass:string){
    this.http.post<any>('http://127.0.0.1:5001/login',{name:user,pass:pass},{responseType:'json'}).subscribe((data) =>{
    
      if(data['data'] == 'true'){
        this.isLogged = false
      } else{
        this.isLogged = true
      }
       
    })
  }

  logout(){
    this.http.post<any>('http://127.0.0.1:5001/logout',{}).subscribe((data)=>{
      this.isLogged = true
      console.log(this.isLogged);
    })
  }
  
}

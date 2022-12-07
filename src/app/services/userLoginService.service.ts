import { HttpClient } from '@angular/common/http';
import { Injectable, Input, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http:HttpClient) {
    
  }
  isLogged:boolean 
  message:string

  auth(){
    this.http.post('127.0.0.1:5001',{}).subscribe(data => {
      console.log(data)
    })
  }

  login(user:string,pass:string){
    this.http.post<any>('http://127.0.0.1:5001/login',{name:user,pass:pass},{responseType:'json'}).subscribe((data) =>{
      console.log(data);
      if(data['data'] == true){
        this.isLogged = true
      } else{
        this.isLogged = false
      }
       
    })
  }

  logout(){
    this.http.post<any>('http://127.0.0.1:5001/logout',{}).subscribe((data)=>{
      this.isLogged = false
      console.log(this.isLogged);
    })
  }
  
}

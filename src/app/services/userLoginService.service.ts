import { JsonPipe, ɵparseCookieValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, Input, Output} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { pipe } from 'rxjs';
import { userData } from './userdata.interface';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http:HttpClient,private cookieService:CookieService) {
    
  }
  isLogged:boolean 
  message:string
  dataStr:string
  
  auth(){
    this.http.post('127.0.0.1:5001',{}).subscribe(data => {
      console.log(data)
    })
  }

  register(userData:any){
    this.dataStr = JSON.stringify(userData)
    console.log(this.dataStr);
    
    this.http.post('http://127.0.0.1:5001/register',{data:this.dataStr}).subscribe(data => {
      console.log(data);
      
    })
  }

  login(user:string,pass:string){
    const logging = this.http.post<any>('http://127.0.0.1:5001/login', { name: user, pass: pass }, { responseType: 'json' }).subscribe((data) => {
      console.log(data);
      if (data['data'] == true) {
        this.isLogged = true;
        // TODO: ser expiration date
        this.cookieService.set('key', data['token']);
        // this.cookieService.set('id',data['id'])
      } else {
        this.isLogged = false;
      }
    })

    
  }


  logout(){
    this.http.post<any>('http://127.0.0.1:5001/logout',{key:this.cookieService.get('key')}).subscribe((data)=>{
      this.isLogged = false
      this.cookieService.deleteAll()
      console.log(this.isLogged);
    })
  }
  
}

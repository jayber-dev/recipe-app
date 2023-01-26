import { JsonPipe, ɵparseCookieValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, Input, Output} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { pipe } from 'rxjs';
import { userData } from './userdata.interface';
import { UserShortData } from './userShortData.interface';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http:HttpClient,private cookieService:CookieService) {
    
  }
  isLogged:boolean 
  message:string
  dataStr:string
  userData:userData
  userShortData:UserShortData
  
  
  uploadProfileImg(formData:any){
    console.log(formData);
    
    const http = this.http.post('http://127.0.0.1:5001/upload-profile',formData).subscribe(data => {
      console.log(data);
      
      http.unsubscribe()
    })
  }

  auth(){
    const auth = this.http.post('127.0.0.1:5001',{}).subscribe(data => {
      console.log(data);
      auth.unsubscribe()
    })
  }

  register(userData:any){
    this.dataStr = JSON.stringify(userData)
    const register = this.http.post('http://127.0.0.1:5001/register',{data:this.dataStr}).subscribe(data => {
      register.unsubscribe()
    })
  }

  login(user:string,pass:string){
    return this.http.post<any>('http://127.0.0.1:5001/login', { name: user, pass: pass }, { responseType: 'json' })

    // logging.unsubscribe()
  }

  logout(){
    this.http.post('http://127.0.0.1:5001/logout',{key:this.cookieService.get('key')}).subscribe((data)=>{
      this.isLogged = false
      this.cookieService.deleteAll()
    })
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  getData(){
    this.http.get('127.0.0.1:5001')
  }
  constructor(private http:HttpClient) { }
}

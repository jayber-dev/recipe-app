import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddRecipeForm } from 'src/app/components/add-recipe/addRecipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  addRecipe(data: AddRecipeForm){
    const send = this.http.post('http://127.0.0.1:5001/addRecipe',{data}).subscribe((data)=>{
      console.log('data sent');
      console.log(data);
      
      send.unsubscribe()
    })
  }
}

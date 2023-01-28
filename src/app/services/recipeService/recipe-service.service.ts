import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RecpieModel } from 'src/app/components/recipesComponents/add-recipe/addRecipe.interface';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesList:any = [] ;
  recipe:any

  constructor(private http: HttpClient, private cookieService: CookieService) {
    const recipesList: any[] = this.recipesData;
  }
  recipesData: string[];
  domain:String = 'http://127.0.0.1'
  port:string = '5000'
  fileUpload(formData) {
    const upload = this.http
      .post(`${this.domain}:${this.port}/upload-img`, formData)
      .subscribe((data) => {
        upload.unsubscribe();
      });
  }

  updateRecipe(data,id){
    console.log(id);
     return this.http.patch(`${this.domain}:${this.port}/updateRecipe`, {data:data,id:id})
  }

  addRecipe(data: RecpieModel) {
    const send = this.http
      .post(`${this.domain}:${this.port}/addRecipe`, {
        key: this.cookieService.get('key'),
        data,
      })
      .subscribe((data) => {
        send.unsubscribe();
      });
  }

  deleteRecipe(id){
    return this.http.delete(`${this.domain}:${this.port}/deleteRecipe`, {params:{data:id}})
  }

  retriveRecipes(startIndex:number,endIndex:number) { 
    // Retrives all recipes for home page
    return this.http.get(`${this.domain}:${this.port}/retriveRecipes`,{params:{startIndex:startIndex,endIndex:endIndex}});
  }

  retriveRecipe(id: string) { 
    // Retrive data for one recipe with ingredients and cooking steps
    return this.http.get(`${this.domain}:${this.port}/retriveRecipe/` + id);
  }

  retriveUserRecipes (){ 
    // Retrives all user recipes
    return this.http.get(`${this.domain}:${this.port}/retriveUserRecipes/`, {params:{key:this.cookieService.get('key')}} )
  }
}

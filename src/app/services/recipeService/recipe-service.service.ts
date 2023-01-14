import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RecpieModel } from 'src/app/components/add-recipe/addRecipe.interface';

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

  fileUpload(formData) {
    const upload = this.http
      .post('http://127.0.0.1:5001/upload-img', formData)
      .subscribe((data) => {
        upload.unsubscribe();
      });
  }

  addRecipe(data: RecpieModel) {
    const send = this.http
      .post('http://127.0.0.1:5001/addRecipe', {
        key: this.cookieService.get('key'),
        data,
      })
      .subscribe((data) => {
        send.unsubscribe();
      });
  }

  deleteRecipe(id){
    return this.http.delete('http://127.0.0.1:5001//deleteRecipe', {params:{data:id}})
  }

  retriveRecipes(startIndex:number,endIndex:number) { 
    // Retrives all recipes for home page
    return this.http.get('http://127.0.0.1:5001/retriveRecipes',{params:{startIndex:startIndex,endIndex:endIndex}});
  }

  retriveRecipe(id: string) { 
    // Retrive data for one recipe with ingredients and cooking steps
    return this.http.get('http://127.0.0.1:5001/retriveRecipe/' + id);
  }

  retriveUserRecipes (){ 
    // Retrives all user recipes
    return this.http.get('http://127.0.0.1:5001/retriveUserRecipes/', {params:{key:this.cookieService.get('key')}} )
  }
}

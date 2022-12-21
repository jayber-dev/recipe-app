import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RecpieModel } from 'src/app/components/add-recipe/addRecipe.interface';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  recipesData:string
  

  addRecipe(data: RecpieModel) {
    const send = this.http
      .post('http://127.0.0.1:5001/addRecipe', {
        key: this.cookieService.get('key'),
        data,
      })
      .subscribe((data) => {
        console.log('data sent');
        console.log(data);

        send.unsubscribe();
      });
  }
}

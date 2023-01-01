import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { UserLoginService } from 'src/app/services//authServices/userLoginService.service';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';
import { recipeData } from './recipeData.interface';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  constructor(
    public user: UserLoginService,
    public recipeService: RecipeService,
    private http: HttpClient,
    public Sanitaizer: DomSanitizer,
    private location: Location,
    private change: ChangeDetectorRef
  ) {}
  someSubscription: any;
  url: SafeUrl;
  fetchedData: recipeData[];
  paths: SafeUrl[];
  currUrl: string;

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit() {
    console.log("im in the ngoninit")
    // this.fetchedData = this.recipeService.recipesList;
    const recieps = this.recipeService.retriveRecipes().subscribe((data) => {
      this.recipeService.recipesList = data;
      this.fetchedData = this.recipeService.recipesList;
      // this.location.onUrlChange((event)=>{

      //       console.log(this.currUrl);
      //       if(this.currUrl === "/addRecipe"){
      //         window.location.reload()
      //       }
      //       this.currUrl = event
      // })
      recieps.unsubscribe();
    });

    this.fetchedData = this.recipeService.recipesList;

  }
}

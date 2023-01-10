import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UserLoginService } from 'src/app/services//authServices/userLoginService.service';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';
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
  fetchedData: any;
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

  updateRecipeRecords() {
    if(this.recipeService.recipesList){
      this.fetchedData.push(...this.recipeService.recipesList)
    }
    this.recipeService.recipesList = []   
  }

  ngOnInit() {
    console.log("im in the ngoninit") 
    const recieps = this.recipeService.retriveRecipes().subscribe((data) => {
      this.fetchedData = data;
      console.log(this.fetchedData);
      
      this.location.onUrlChange((event)=>{

            console.log(this.currUrl);
            if(this.currUrl === "/addRecipe"){
              window.location.reload()
            }
            this.currUrl = event
            
      })
      this.updateRecipeRecords()
      recieps.unsubscribe();
    });
    
    

  }
}

import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { UserLoginService } from 'src/app/services//authServices/userLoginService.service';
import { RecipeService } from 'src/app/services/recipeService/recipe-service.service';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  listner:any
  someSubscription: any;
  url: SafeUrl;
  fetchedData: any;
  paths: SafeUrl[];
  currUrl: string;
  currObjLength:number = 0
  maxServerData:number
  makeCall:boolean

  constructor(
    public user: UserLoginService,
    public recipeService: RecipeService,
    private http: HttpClient,
    public Sanitaizer: DomSanitizer,
    private location: Location,
    private change: ChangeDetectorRef,
    private renderer2:Renderer2
  ) {

    this.listner = this.renderer2.listen('window', 'scroll', (e) => { 
      // console.log(e);
      
      // console.log(e.target.scrollingElement.offsetHeight - 1000);
        
      // console.log(e.target.scrollingElement.scrollTop); 
    })
  }

  onScrollEvent(e: any){
    const maxHeight = e.target.scrollingElement.offsetHeight - 1200;
    const currScroll = e.target.scrollingElement.scrollTop; 
    if(currScroll > maxHeight){
      if(this.makeCall){
        const request = this.recipeService.retriveRecipes(10,20).subscribe(data => {
          
          this.currObjLength = data[0]['currLength']
          for(let i = 0; i < this.currObjLength;i++){
            this.fetchedData.push(data[i]);
          }

          this.makeCall = this.currObjLength < 10 ? false: true;
          request.unsubscribe()
        })
      }
    };
    
    
  }

  getYPosition(e: Event): number {
    return (e.target as Element).scrollHeight;
  }


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
    const recieps = this.recipeService.retriveRecipes(0,10).subscribe((data) => {
      this.fetchedData = data;
      this.maxServerData = data[0]['max-length']
      this.currObjLength = data[0]['currLength']
      this.makeCall = this.currObjLength == 10 ? true : false
      // console.log(this.fetchedData);
      // console.log(this.maxServerData);
      
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

  ngOnDestroy(): void {
    this.listner()
  }
}

import { Component,Input } from '@angular/core';
import { recipeData } from './recipeData.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipe-app';

  // @Input() src: string = 'src/assets/images/salmon-518032_1280.jpg'
  // @Input() src:string[] = ['../../assets/images/salmon-518032_1280.jpg','../../assets/images/highway-7542272_1920.jpg']
  
  @Input()
  imgData: recipeData[]= [
    {
    imgUrl:'../../assets/images/salmon-518032_1280.jpg',
    imgDescription: 'מנת דג סלמון גורמה'
    },
    {
    imgUrl:'../../assets/images/highway-7542272_1920.jpg',
    imgDescription:'טעם הררי וחולי מנת גורמה לכל ילד בגן',
    },
    {
    imgUrl:'../../assets/images/asparagus-2169305_1920.jpg',
    imgDescription:'טעים טעים',
    },
    {
    imgUrl:'../../assets\\images\\pancakes-1984716_1920.jpg',
    imgDescription:'מאפה לקפה ומיד לשירותים',
    },
    {
    imgUrl:'../../assets/images/pasta-3547078_1920.jpg',
    imgDescription:'פסטה לה ויסטה בייבי',
    },
    {
    imgUrl:'../../assets/images/pizza-329523_1920.jpg',
    imgDescription:'איטלקית מעודנת איזו פיצה ',
    },
    
];

}

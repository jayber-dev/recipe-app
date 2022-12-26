import { SafeUrl } from "@angular/platform-browser";

export interface RecpieModel {
    title:string,
    cookingTime:number,
    img:string,
    ingredients:string[],
    cookingSteps:string[],
}
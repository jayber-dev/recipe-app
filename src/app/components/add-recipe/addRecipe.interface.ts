
export interface RecpieModel {
    title:string,
    cookingTime:number,
    img:string,
    ingredients:Ingredient[],
    cookingSteps:string[],
}

export interface Ingredient {
    ingredient:string;
    quantity:number;
    unit:string;
  }
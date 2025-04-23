
export interface Recipe {
  id?: string;
  title: string;
  description: string;
  foodType: string;
  ingredients: string[];
  recipes: string; // 👈 New field
  image: string;  // This should be the URL of the image
}

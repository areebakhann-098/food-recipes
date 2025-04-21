export interface Recipe {
    id?: string; 
    title: string;
    description: string;
    foodType: string;
    ingredients: string;
    image: string;
    favorite?: boolean; // <-- New!

  }
  
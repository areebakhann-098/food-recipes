import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'add-recipe',
    loadComponent: () =>
      import('./components/add-recipe/add-recipe.component').then(m => m.AddRecipeComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'recipes',
    loadComponent: () =>
      import('./components/recipe-list/recipe-list.component').then(m => m.RecipeListComponent)
  },
  {
    path: 'recipe/:id',
    loadComponent: () =>
      import('./components/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent)
  },
  
  
  {
    path: '**',
    redirectTo: ''
  }
];

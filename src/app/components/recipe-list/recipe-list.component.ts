import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, TranslateModule, ButtonModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  loading = true;
  searchQuery: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit(): void {
    this.firebaseService.getAllRecipes()
      .then(recipes => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
        this.loading = false;
      })
      .catch(err => {
        console.error('🔥 Error loading recipes:', err);
        this.loading = false;
      });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/recipe', id]);
  }
  

  deleteRecipe(recipeId: string): void {
    this.firebaseService.deleteRecipe(recipeId)
      .then(() => {
        this.recipes = this.recipes.filter(r => r.id !== recipeId);
        this.filterRecipes();
      })
      .catch(err => {
        console.error('🔥 Error deleting recipe:', err);
      });
  }

  filterRecipes(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query)
    );
  }
  
}

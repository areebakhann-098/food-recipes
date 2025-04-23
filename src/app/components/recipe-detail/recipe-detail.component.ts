import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipeId!: string;
  recipe?: Recipe;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id')!;
    this.firebaseService.getRecipeById(this.recipeId).then(data => {
      this.recipe = data;
    });
  }
  formatList(ingredients: string | string[] | undefined): string {
    if (!ingredients) return '';
  
    const lines = Array.isArray(ingredients) ? ingredients : ingredients.split('\n');
    return lines
      .map(item => `<li>${item.trim()}</li>`)
      .join('');
  }
  
  formatSteps(steps: string | string[] | undefined): string {
    if (!steps) return '';
  
    const lines = Array.isArray(steps) ? steps : steps.split('\n');
    return lines
      .map(item => `<li>${item.trim()}</li>`)
      .join('');
  }
  
  
 
  
}

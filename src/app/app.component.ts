import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,         // ✅ ADD THIS LINE
    NavbarComponent, 
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router: Router) {}

  isDetailPage(): boolean {
    return this.router.url.startsWith('/recipe/');
  }
}

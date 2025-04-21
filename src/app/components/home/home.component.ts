import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { AboutComponent } from '../about/about.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';

@Component({
  selector: 'app-home',
  imports: [ImageSliderComponent, AboutComponent, RecipeListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

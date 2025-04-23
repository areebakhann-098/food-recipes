import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './image-slider.component.html',
  styleUrls: []
})
export class ImageSliderComponent {
  images = [
    { url: 'banner2.PNG', title: 'Lets Cook Something Yummy' },
    { url: 'banner.png', title: 'Cooking is Love Made Visible' },
    { url: 'banner 1.png', title: 'By Food Recipes' },
    { url: 'about.jpg', title: 'Good Food Good Mood' },
    { url: 'banner3.jpg', title: 'The Best Memories Are Made Around The Table' },
    { url: 'banner5.jpg', title: 'Where there is food there is love' },
   
  ];
}

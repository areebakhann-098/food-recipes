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
 
    { url: 'banner.png', title: 'By Delicious Food' },
    { url: 'banner 1.png', title: 'By Delicious Food' },
    { url: 'banner4.jpg', title: 'By Delicious Food' }


  ];
}

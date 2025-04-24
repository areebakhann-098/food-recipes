import { Component } from '@angular/core';
import { TranslationService } from '../../translation.service';

import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-navbar',
  imports: [TranslateModule, RouterModule, ButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOpen = false;
  

  constructor(private translationService: TranslationService) {}
  changeLanguage(lang: string) {
    this.translationService.translateText(lang);
  }
  
}



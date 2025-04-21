import { Component } from '@angular/core';
import { TranslationService } from '../../translation.service';

import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [TranslateModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private translationService: TranslationService) {}
  changeLanguage(lang: string) {
    this.translationService.translateText(lang);
  }
}

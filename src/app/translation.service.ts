import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Default language
    this.translate.use('en');
  }

  // Function to change language
  translateText(lang: string) {
    this.translate.use(lang);
  }

  // Get current language
  get currentLang(): string {
    return this.translate.currentLang;
  }

  // Available languages (for dropdowns etc)
  get availableLanguages(): string[] {
    return ['en', 'ur', 'es'];  // Include Spanish as well
  }
}

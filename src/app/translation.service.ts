import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.setDirection('en'); // set default direction
  }

  translateText(lang: string) {
    this.translate.use(lang);
    this.setDirection(lang);
  }

  private setDirection(lang: string) {
    const rtlLanguages = ['ur', 'ar', 'he'];
    const direction = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
  }

  get currentLang(): string {
    return this.translate.currentLang;
  }

  get availableLanguages(): string[] {
    return ['en', 'ur', 'es'];
  }
}

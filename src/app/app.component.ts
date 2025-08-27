import { Component } from '@angular/core';
import { LocalizationService } from './services/localization.service';

@Component({
  selector: 'app-root-transferencia',
  template: `<router-outlet></router-outlet>`,
  styles: [':host { display: block; height: 100%; }']
})
export class AppComponent {
currentLanguage: string = 'pt-BR';

  constructor(private localizationService: LocalizationService) {
    this.localizationService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  changeLanguage(lang: string) {
    this.localizationService.setLanguage(lang);
  }
}









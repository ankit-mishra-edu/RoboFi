import { Component, OnInit } from '@angular/core';
import { SeoService } from '@core/services/seo';
import { ThemeService } from '@core/services/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.runGlobalServices();
  }

  private runGlobalServices(): void {
    this.seoService.init();
    this.themeService.init();
  }
}

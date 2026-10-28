import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { ServicesComponent } from './components/services/services';
import { AboutComponent } from './components/about/about';
import { ContactsComponent } from './components/contacts/contacts';
import { PortfolioComponent } from './components/portfolio/portfolio';
import { PricesComponent } from './components/prices/prices';
import { ReviewsComponent } from './components/reviews/reviews';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    ContactsComponent,
    PortfolioComponent,
    PricesComponent,
    ReviewsComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = signal('plit-real-front');
}

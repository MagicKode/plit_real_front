import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { ServicesComponent } from './components/services/services';
import { AboutComponent } from './components/about/about';
import { PricesComponent } from './components/prices/prices';
import { ReviewsComponent } from './components/reviews/reviews';
import { PortfolioCategoriesComponent } from './components/portfolio-categories/portfolio-categories';
import { LoginModalComponent } from './components/login-modal/login-modal';
import { AsyncPipe } from '@angular/common';
import { AuthService } from './core/auth';
import ContactsComponent from './components/contacts/contacts';

@Component({
  selector: 'app-root',
  imports: [
    AsyncPipe,
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    PortfolioCategoriesComponent,
    PricesComponent,
    ReviewsComponent,
    ContactsComponent,
    LoginModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = signal('plit-real-front');
  constructor(public authService: AuthService) {}
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { ServicesComponent } from './components/services/services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HeroComponent, ServicesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('plit-real-front');
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('plit-real-front');
}

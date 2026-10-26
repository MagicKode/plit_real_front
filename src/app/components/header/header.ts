import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  phone: string = '+375 (25) 500-90-52';
  telegram: string = 'https://t.me/ваш_ник';
}

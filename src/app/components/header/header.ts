import { Component } from '@angular/core';
import { AuthService } from '../../core/auth';
import { Router } from '@angular/router';

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

  constructor(public authService: AuthService, private router: Router) {}

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

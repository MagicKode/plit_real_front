import { Component } from '@angular/core';
import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class ContactsComponent {
  phone: string = '+375 (25) 500-90-52';
  telegram: string = 'https://t.me/ваш_ник';
  viber: string = 'viber://chat?number=%2B375255009052';
  address: string = 'Минск и Минский район';

  constructor(public authService: AuthService) {}
}

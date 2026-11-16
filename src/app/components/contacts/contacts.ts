import { Component } from '@angular/core';
import { AuthService } from '../../core/auth';
import { CommonModule } from '@angular/common';
import { ContactsEditModalComponent } from '../contacts-edit-modal/contacts-edit-modal';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactsEditModalComponent],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css'
})
export class ContactsComponent {
  phone: string = '+375 (25) 500-90-52';
  telegram: string = 'https://t.me/ваш_ник';
  viber: string = 'viber://chat?number=%2B375255009052';
  address: string = 'Минск и Минский район';

  isEditModalOpen = false;

  constructor(public authService: AuthService) {}

  editContacts() {
    this.isEditModalOpen = true;
  }

  onSaveContacts(data: { phone: string; telegram: string; viber: string; address: string }) {
    this.phone = data.phone;
    this.telegram = data.telegram;
    this.viber = data.viber;
    this.address = data.address;
    this.isEditModalOpen = false;
  }

  onCloseContactsModal() {
    this.isEditModalOpen = false;
  }
}

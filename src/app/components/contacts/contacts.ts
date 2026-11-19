import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth';
import { CommonModule } from '@angular/common';
import { ContactsEditModalComponent } from '../contacts-edit-modal/contacts-edit-modal';
import { ContactInfo, ContentService } from '../../core/content';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactsEditModalComponent],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css'
})
class ContactsComponent implements OnInit{
  phone: string = '+375 (25) 500-90-52';
  telegram: string = 'https://t.me/ваш_ник';
  viber: string = 'viber://chat?number=%2B375255009052';
  address: string = 'Минск и Минский район';

  isEditModalOpen = false;

  constructor(
    public authService: AuthService,
    private contentService: ContentService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    // Загружаем актуальные контакты из PostgreSQL
    this.contentService.getContacts().subscribe({
      next: (data) => {
        if (data) {
          this.phone = data.phone || this.phone;
          this.telegram = data.telegram || this.telegram;
          this.viber = data.viber || this.viber;
          this.address = data.address || this.address;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Ошибка загрузки контактов:', err)
    });
  }

  // Формирует чистый номер для атрибута href="tel:..." (оставляет только + и цифры)
  get cleanPhone(): string {
    return this.phone.replace(/[^\d+]/g, '');
  }

  editContacts() {
    this.isEditModalOpen = true;
  }

  onSaveContacts(data: ContactInfo) {
    this.contentService.updateContacts(data).subscribe({
      next: (saved) => {
        this.phone = saved.phone;
        this.telegram = saved.telegram;
        this.viber = saved.viber;
        this.address = saved.address;
        this.isEditModalOpen = false;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Ошибка сохранения контактов:', err)
    });
  }

  onCloseContactsModal() {
    this.isEditModalOpen = false;
  }
}

export default ContactsComponent;

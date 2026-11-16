import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts-edit-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contacts-edit-modal.html',
  styleUrl: './contacts-edit-modal.css'
})
export class ContactsEditModalComponent implements OnInit {
  @Input() phone = '';
  @Input() telegram = '';
  @Input() viber = '';
  @Input() address = '';

  @Output() save = new EventEmitter<{ phone: string; telegram: string; viber: string; address: string }>();
  @Output() close = new EventEmitter<void>();

  editablePhone = '';
  editableTelegram = '';
  editableViber = '';
  editableAddress = '';

  ngOnInit() {
    this.editablePhone = this.phone;
    this.editableTelegram = this.telegram;
    this.editableViber = this.viber;
    this.editableAddress = this.address;
  }

  onSave() {
    this.save.emit({
      phone: this.editablePhone,
      telegram: this.editableTelegram,
      viber: this.editableViber,
      address: this.editableAddress
    });
  }

  onClose() {
    this.close.emit();
  }
}

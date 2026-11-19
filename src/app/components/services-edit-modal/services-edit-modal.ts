import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface ServiceItem {
  id?: number;
  title: string;
  description: string;
  icon: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-services-edit-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './services-edit-modal.html',
  styleUrl: './services-edit-modal.css'
})
export class ServicesEditModalComponent implements OnInit {
  @Input() services: ServiceItem[] = [];
  @Output() save = new EventEmitter<ServiceItem[]>();
  @Output() close = new EventEmitter<void>();

  editableServices: ServiceItem[] = [];

  ngOnInit() {
    this.editableServices = this.services.map(s => ({ ...s }));
  }

  addService() {
    this.editableServices.push({
      id: Date.now(),
      title: '',
      description: '',
      icon: '🧱',
      isNew: true
    });
  }

  removeService(index: number) {
    this.editableServices.splice(index, 1);
  }

  onSave() {
    // Убираем временные ID у новых записей, чтобы JPA выполнил INSERT вместо MERGE
    const payload: ServiceItem[] = this.editableServices
      .filter(s => s.title.trim() !== '') // заодно отсекаем пустые карточки
      .map(({ isNew, id, ...rest }) => ({
        ...rest,
        id: isNew ? undefined : id
      }));

    this.save.emit(payload);
  }

  onClose() {
    this.close.emit();
  }
}

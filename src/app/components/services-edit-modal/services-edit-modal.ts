import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
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

  editableServices: ServiceItem[] = []; // <-- ВОТ ОНА

  ngOnInit() {
    this.editableServices = this.services.map(s => ({ ...s }));
  }

  addService() {
    this.editableServices.push({
      id: Date.now(),
      title: '',
      description: '',
      icon: '🧱'
    });
  }

  removeService(index: number) {
    this.editableServices.splice(index, 1);
  }

  onSave() {
    this.save.emit(this.editableServices);
  }

  onClose() {
    this.close.emit();
  }
}

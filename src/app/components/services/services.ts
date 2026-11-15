import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth';
import { CommonModule } from '@angular/common';
import { ServiceItem, ServicesEditModalComponent } from '../services-edit-modal/services-edit-modal';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServicesEditModalComponent],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent implements OnInit {
  services: ServiceItem[] = [
    { id: 1, title: 'Укладка плитки', description: 'Профессиональная укладка керамической плитки, керамогранита и мозаики.', icon: '🧱' },
    { id: 2, title: 'Сантехнические работы', description: 'Разводка труб, установка смесителей, унитазов и душевых кабин.', icon: '🔧' },
    { id: 3, title: 'Демонтажные работы', description: 'Аккуратный демонтаж старой плитки и сантехники.', icon: '🔨' },
    { id: 4, title: 'Подготовительные работы', description: 'Стяжка пола, гидроизоляция, штукатурка стен.', icon: '🏗️' },
    { id: 5, title: 'Душевые поддоны', description: 'Изготовление и монтаж душевых поддонов любой сложности.', icon: '🚿' },
    { id: 6, title: 'Облицовка лестниц', description: 'Облицовка бетонных лестниц плиткой с подгонкой по месту.', icon: '🪜' }
  ];

  isEditModalOpen = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  editServices() {
    this.isEditModalOpen = true;
  }

  onSaveServices(updatedServices: ServiceItem[]) {
    this.services = updatedServices;
    this.isEditModalOpen = false;
  }

  onCloseServicesModal() {
    this.isEditModalOpen = false;
  }
}

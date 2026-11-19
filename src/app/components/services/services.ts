import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth';
import { CommonModule } from '@angular/common';
import {
  ServiceItem,
  ServicesEditModalComponent,
} from '../services-edit-modal/services-edit-modal';
import { ContentService } from '../../core/content';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServicesEditModalComponent],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent implements OnInit {
  services: ServiceItem[] = [
    {
      id: 1,
      title: 'Укладка плитки',
      description: 'Профессиональная укладка керамической плитки, керамогранита и мозаики.',
      icon: '🧱',
    },
    {
      id: 2,
      title: 'Сантехнические работы',
      description: 'Разводка труб, установка смесителей, унитазов и душевых кабин.',
      icon: '🔧',
    },
    {
      id: 3,
      title: 'Демонтажные работы',
      description: 'Аккуратный демонтаж старой плитки и сантехники.',
      icon: '🔨',
    },
    {
      id: 4,
      title: 'Подготовительные работы',
      description: 'Стяжка пола, гидроизоляция, штукатурка стен.',
      icon: '🏗️',
    },
    {
      id: 5,
      title: 'Душевые поддоны',
      description: 'Изготовление и монтаж душевых поддонов любой сложности.',
      icon: '🚿',
    },
    {
      id: 6,
      title: 'Облицовка лестниц',
      description: 'Облицовка бетонных лестниц плиткой с подгонкой по месту.',
      icon: '🪜',
    },
  ];

  isEditModalOpen = false;

  constructor(
    public authService: AuthService,
    private contentService: ContentService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // Загружаем список услуг из PostgreSQL
    this.contentService.getServices().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.services = data;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Ошибка загрузки услуг:', err),
    });
  }

  editServices() {
    this.isEditModalOpen = true;
  }

  onSaveServices(updatedServices: ServiceItem[]) {
    this.contentService.updateServices(updatedServices).subscribe({
      next: (saved) => {
        this.services = saved;
        this.isEditModalOpen = false;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Ошибка сохранения услуг:', err),
    });
  }

  onCloseServicesModal() {
    this.isEditModalOpen = false;
  }
}

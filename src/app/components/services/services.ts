import { Component } from '@angular/core';

interface Service {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent {
  services: Service[] = [
    {
      title: 'Укладка плитки',
      description: 'Профессиональная укладка керамической плитки, керамогранита и мозаики.',
      icon: '🧱',
    },
    {
      title: 'Сантехнические работы',
      description: 'Разводка труб, установка смесителей, унитазов и душевых кабин.',
      icon: '🔧',
    },
    {
      title: 'Демонтажные работы',
      description: 'Аккуратный демонтаж старой плитки и сантехники.',
      icon: '🔨',
    },
    {
      title: 'Подготовительные работы',
      description: 'Стяжка пола, гидроизоляция, штукатурка стен.',
      icon: '🏗️',
    },
    {
      title: 'Душевые поддоны',
      description: 'Изготовление и монтаж душевых поддонов любой сложности.',
      icon: '🚿',
    },
    {
      title: 'Облицовка лестниц',
      description: 'Облицовка бетонных лестниц плиткой с подгонкой по месту.',
      icon: '🪜',
    },
  ];
}

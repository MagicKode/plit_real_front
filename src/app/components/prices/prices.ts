import { Component } from '@angular/core';
import { AuthService } from '../../core/auth';
import { CommonModule } from '@angular/common';
import { PricesEditModalComponent, PriceItem } from '../prices-edit-modal/prices-edit-modal';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CommonModule, PricesEditModalComponent],
  templateUrl: './prices.html',
  styleUrl: './prices.css'
})
export class PricesComponent {
  prices: PriceItem[] = [
    { service: 'Укладка плитки на пол', price: 'от 20', unit: 'руб/м²' },
    { service: 'Укладка плитки на стены', price: 'от 20', unit: 'руб/м²' },
    { service: 'Укладка мозаики', price: 'от 30', unit: 'руб/м²' },
    { service: 'Облицовка лестниц', price: 'от 25', unit: 'руб/м.п.' },
    { service: 'Сантехнические работы', price: 'от 30', unit: 'руб/точка' },
    { service: 'Демонтаж плитки', price: 'от 10', unit: 'руб/м²' },
    { service: 'Стяжка пола', price: 'от 15', unit: 'руб/м²' },
    { service: 'Гидроизоляция', price: 'от 12', unit: 'руб/м²' },
  ];

  isEditModalOpen = false;

  constructor(public authService: AuthService) {}

  editPrices() {
    this.isEditModalOpen = true;
  }

  onSavePrices(updatedPrices: PriceItem[]) {
    this.prices = updatedPrices;
    this.isEditModalOpen = false;
  }

  onClosePricesModal() {
    this.isEditModalOpen = false;
  }
}

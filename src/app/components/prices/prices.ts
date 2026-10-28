import { Component } from '@angular/core';

interface PriceItem {
  service: string;
  price: string;
  unit: string;
}

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [],
  templateUrl: './prices.html',
  styleUrl: './prices.css',
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
}

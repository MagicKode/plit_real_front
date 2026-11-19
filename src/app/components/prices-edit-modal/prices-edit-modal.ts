import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface PriceItem {
  service: string;
  price: string;
  unit: string;
}

export interface PriceItem {
  id?: number; // Добавьте эту строку
  service: string;
  price: string;
  unit: string;
}

@Component({
  selector: 'app-prices-edit-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './prices-edit-modal.html',
  styleUrl: './prices-edit-modal.css'
})
export class PricesEditModalComponent implements OnInit {
  @Input() prices: PriceItem[] = [];
  @Output() save = new EventEmitter<PriceItem[]>();
  @Output() close = new EventEmitter<void>();

  editablePrices: PriceItem[] = [];

  ngOnInit() {
    this.editablePrices = this.prices.map(p => ({ ...p }));
  }

  addPrice() {
    this.editablePrices.push({ service: '', price: '', unit: 'руб/м²' });
  }

  removePrice(index: number) {
    this.editablePrices.splice(index, 1);
  }

  onSave() {
    this.save.emit(this.editablePrices);
  }

  onClose() {
    this.close.emit();
  }
}

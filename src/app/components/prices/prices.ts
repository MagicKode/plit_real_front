import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../core/auth';
import { CommonModule } from '@angular/common';
import { PricesEditModalComponent, PriceItem } from '../prices-edit-modal/prices-edit-modal';
import { ContentService } from '../../core/content';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CommonModule, PricesEditModalComponent],
  templateUrl: './prices.html',
  styleUrl: './prices.css'
})
export class PricesComponent {
  prices: PriceItem[] = [];

  isEditModalOpen = false;

  constructor(
    public authService: AuthService,
    private contentService: ContentService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    // Загружаем актуальный прайс-лист из PostgreSQL
    this.contentService.getPrices().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.prices = data;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Ошибка загрузки расценок:', err)
    });
  }

  editPrices() {
    this.isEditModalOpen = true;
  }

  onSavePrices(updatedPrices: PriceItem[]) {
    // Сохраняем изменения в БД через PUT /api/v1/prices
    this.contentService.updatePrices(updatedPrices).subscribe({
      next: (saved) => {
        this.prices = saved;
        this.isEditModalOpen = false;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Ошибка сохранения расценок:', err)
    });
  }

  onClosePricesModal() {
    this.isEditModalOpen = false;
  }
}

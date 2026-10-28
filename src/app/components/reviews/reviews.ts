import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Review {
  name: string;
  text: string;
  rating: number;
  date: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class ReviewsComponent {
  reviews: Review[] = [
    {
      name: 'Вадим',
      text: 'Отличная работа! Уложил плитку в ванной быстро и аккуратно. Рекомендую!',
      rating: 5,
      date: '12.10.2026',
    },
    {
      name: 'Лариса',
      text: 'Сделали санузел под ключ. Очень довольна результатом. Спасибо!',
      rating: 5,
      date: '05.10.2026',
    },
  ];

  newName: string = '';
  newText: string = '';
  newRating: number = 5;

  stars: number[] = [1, 2, 3, 4, 5];

  setRating(value: number) {
    this.newRating = value;
  }

  addReview() {
    if (this.newName.trim() && this.newText.trim()) {
      const today = new Date().toLocaleDateString('ru-RU');
      this.reviews.unshift({
        name: this.newName,
        text: this.newText,
        rating: this.newRating,
        date: today,
      });
      // Очищаем форму
      this.newName = '';
      this.newText = '';
      this.newRating = 5;
    }
  }
}

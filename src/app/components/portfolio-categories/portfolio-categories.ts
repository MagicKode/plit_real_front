import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Work {
  id: number;
  imageUrl: string;
  title: string;
}

interface Category {
  id: string;
  name: string;
  coverImage: string;
  works: Work[];
}

@Component({
  selector: 'app-portfolio-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-categories.html',
  styleUrl: './portfolio-categories.css'
})
export class PortfolioCategoriesComponent {
  // --- Состояние ---
  activeCategory: Category | null = null; // Открытая категория
  selectedImage: string | null = null;    // Открытое фото (Lightbox)

  // --- Данные (тестовые) ---
  categories: Category[] = [
    {
      id: 'bathroom',
      name: 'Ванная комната',
      coverImage: 'portfolio/job1.jpg',
      works: [
        { id: 1, imageUrl: 'portfolio/job1.jpg', title: 'Ванная в стиле лофт' },
        { id: 2, imageUrl: 'portfolio/job2.jpg', title: 'Ванная с мозаикой' },
        { id: 3, imageUrl: 'portfolio/job3.jpg', title: 'Укладка керамогранита' },
      ]
    },
    {
      id: 'kitchen',
      name: 'Кухня',
      coverImage: 'portfolio/job4.jpeg',
      works: [
        { id: 4, imageUrl: 'portfolio/job4.jpeg', title: 'Кухонный фартук' },
        { id: 5, imageUrl: 'portfolio/job5.jpg', title: 'Фартук из мозаики' },
      ]
    },
    {
      id: 'stairs',
      name: 'Лестницы',
      coverImage: 'portfolio/job6.jpeg',
      works: [
        { id: 6, imageUrl: 'portfolio/job6.jpeg', title: 'Облицовка лестницы' },
      ]
    },
    {
      id: 'shower',
      name: 'Душевая',
      coverImage: 'portfolio/job6.jpeg',
      works: [
        { id: 7, imageUrl: 'portfolio/job1.jpg', title: 'Ванная в стиле лофт' },
        { id: 8, imageUrl: 'portfolio/job2.jpg', title: 'Ванная с мозаикой' },
        { id: 9, imageUrl: 'portfolio/job3.jpg', title: 'Укладка керамогранита' },
      ]
    },
    {
      id: 'living',
      name: 'Гостиная',
      coverImage: 'portfolio/job6.jpeg',
      works: [
        { id: 10, imageUrl: 'portfolio/job1.jpg', title: 'Ванная в стиле лофт' },
        { id: 11, imageUrl: 'portfolio/job2.jpg', title: 'Ванная с мозаикой' },
        { id: 12, imageUrl: 'portfolio/job3.jpg', title: 'Укладка керамогранита' },
      ]
    },
    {
      id: 'hallway',
      name: 'Прихожая ',
      coverImage: 'portfolio/job6.jpeg',
      works: [
        { id: 13, imageUrl: 'portfolio/job1.jpg', title: 'Ванная в стиле лофт' },
        { id: 14, imageUrl: 'portfolio/job2.jpg', title: 'Ванная с мозаикой' },
        { id: 15, imageUrl: 'portfolio/job3.jpg', title: 'Укладка керамогранита' },
      ]
    },
    {
      id: 'balcony',
      name: 'Балкон',
      coverImage: 'portfolio/job6.jpeg',
      works: [
        { id: 16, imageUrl: 'portfolio/job1.jpg', title: 'Ванная в стиле лофт' },
        { id: 17, imageUrl: 'portfolio/job2.jpg', title: 'Ванная с мозаикой' },
        { id: 18, imageUrl: 'portfolio/job3.jpg', title: 'Укладка керамогранита' },
      ]
    },
    {
      id: 'facade',
      name: 'Фасады ',
      coverImage: 'portfolio/job6.jpeg',
      works: [
        { id: 19, imageUrl: 'portfolio/job1.jpg', title: 'Ванная в стиле лофт' },
        { id: 20, imageUrl: 'portfolio/job2.jpg', title: 'Ванная с мозаикой' },
        { id: 21, imageUrl: 'portfolio/job3.jpg', title: 'Укладка керамогранита' },
      ]
    },
    {
      id: 'commercial',
      name: 'Коммерческие помещения',
      coverImage: 'portfolio/job6.jpeg',
      works: [
        { id: 22, imageUrl: 'portfolio/job1.jpg', title: 'Ванная в стиле лофт' },
        { id: 23, imageUrl: 'portfolio/job2.jpg', title: 'Ванная с мозаикой' },
        { id: 24, imageUrl: 'portfolio/job3.jpg', title: 'Укладка керамогранита' },
      ]
    }
  ];

  // --- Методы ---
  openCategory(category: Category) {
    this.activeCategory = category;
  }

  closeCategory() {
    this.activeCategory = null;
    this.selectedImage = null;
  }

  openImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  closeImage() {
    this.selectedImage = null;
  }
}

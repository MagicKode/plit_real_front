import { Component } from '@angular/core';

interface Work {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class PortfolioComponent {
  selectedImage: string | null = null;

  works: Work[] = [
    {id: 1, title: 'Ванная комната', imageUrl: 'portfolio/job1.jpg', category: 'Ванные'},
    {id: 2, title: 'Кухонный фартук', imageUrl: 'portfolio/job2.jpg', category: 'Ванные'},
    {id: 3, title: 'Ванная комната', imageUrl: 'portfolio/job3.jpg', category: 'Кухни'},
    {id: 4, title: 'Ванная комната', imageUrl: 'portfolio/job4.jpeg', category: 'Кухни'},
    {id: 5, title: 'Душевая', imageUrl: 'portfolio/job5.jpg', category: 'Ванные'},
    {id: 6, title: 'Душевая', imageUrl: 'portfolio/job6.jpeg', category: 'Ванные'},
    {id: 7, title: 'Ванная комната', imageUrl: 'portfolio/job7.jpg', category: 'Ванные'},
    {id: 8, title: 'Ванная комната', imageUrl: 'portfolio/job8.jpg', category: 'Ванные'},
    {id: 9, title: 'Ванная комната', imageUrl: 'portfolio/job9.jpg', category: 'Полы'},
    {id: 10, title: 'Ванная комната', imageUrl: 'portfolio/job10.jpg', category: 'Полы'},
  ];

  openImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  closeImage() {
    this.selectedImage = null;
  }
}

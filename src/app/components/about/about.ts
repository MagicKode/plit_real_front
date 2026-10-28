import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  @Input() masterName: string = 'Александр';
  @Input() experience: string = '10 лет';
  @Input() description: string = 'Профессиональный плиточник и сантехник. Работаю официально (ИП). Аккуратно, в срок, с гарантией.';
}

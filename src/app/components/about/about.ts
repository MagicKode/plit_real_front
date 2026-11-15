import { Component, Input } from '@angular/core';
import { AuthService } from '../../core/auth';
import { AboutEditModalComponent } from '../about-edit-modal/about-edit-modal';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutEditModalComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  @Input() masterName: string = 'Александр';
  @Input() experience: string = '10 лет';
  @Input() description: string =
    'Профессиональный плиточник и сантехник. Работаю официально (ИП). Аккуратно, в срок, с гарантией.';

  photoUrl: string = 'master.jpeg'; // Путь к фото
  isEditModalOpen = false;

  constructor(public authService: AuthService) {}

  editAbout() {
    this.isEditModalOpen = true;
  }

  onSaveAbout(data: {
    masterName: string;
    experience: string;
    description: string;
    photoUrl: string;
  }) {
    this.masterName = data.masterName;
    this.experience = data.experience;
    this.description = data.description;
    this.photoUrl = data.photoUrl;
    this.isEditModalOpen = false;
  }

  onCloseAboutModal() {
    this.isEditModalOpen = false;
  }
}

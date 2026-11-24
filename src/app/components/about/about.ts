import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AuthService } from '../../core/auth';
import { AboutEditModalComponent } from '../about-edit-modal/about-edit-modal';
import { AboutInfo, ContentService } from '../../core/content';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutEditModalComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  @Input() masterName: string = '';
  @Input() experience: string = '';
  @Input() description: string = '';

  photoUrl: string = ''; // Путь к фото
  isEditModalOpen = false;

  constructor(
    public authService: AuthService,
    private contentService: ContentService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // Загружаем актуальные данные из PostgreSQL при инициализации компонента
    this.contentService.getAbout().subscribe({
      next: (data) => {
        if (data) {
          this.masterName = data.masterName || this.masterName;
          this.experience = data.experience || this.experience;
          this.description = data.description || this.description;
          if (data.photoUrl) {
            this.photoUrl = data.photoUrl;
          }
          // Обновляем view после асинхронного HTTP-ответа
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Ошибка загрузки блока "О мастере":', err),
    });
  }

  editAbout() {
    this.isEditModalOpen = true;
  }

  onSaveAbout(data: AboutInfo) {
    this.contentService.updateAbout(data).subscribe({
      next: (saved) => {
        const result = saved || data;
        this.masterName = result.masterName;
        this.experience = result.experience;
        this.description = result.description;
        this.photoUrl = result.photoUrl;
        this.isEditModalOpen = false;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Ошибка сохранения блока "О мастере":', err),
    });
  }

  onCloseAboutModal() {
    this.isEditModalOpen = false;
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth';
import { ContentService, HeroInfo } from '../../core/content';
import { HeroEditModalComponent } from '../hero-edit-modal/hero-edit-modal';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeroEditModalComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements OnInit {
  title = '';
  subtitle = '';
  buttonText = '';
  backgroundUrl = '';

  isEditModalOpen = false;

  constructor(
    public authService: AuthService,
    private contentService: ContentService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.contentService.getHero().subscribe({
      next: (data) => {
        if (data) {
          this.title = data.title || this.title;
          this.subtitle = data.subtitle || this.subtitle;
          this.buttonText = data.buttonText || this.buttonText;
          this.backgroundUrl = data.backgroundUrl || this.backgroundUrl;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Ошибка загрузки блока Hero:', err),
    });
  }

  get fullBackgroundStyle(): string {
    const url = this.backgroundUrl.startsWith('/uploads')
      ? 'http://localhost:8080' + this.backgroundUrl
      : this.backgroundUrl;
    return `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${url}')`;
  }

  editHero() {
    this.isEditModalOpen = true;
  }

  onSaveHero(data: HeroInfo) {
    this.contentService.updateHero(data).subscribe({
      next: (saved) => {
        const result = saved || data;
        this.title = result.title;
        this.subtitle = result.subtitle;
        this.buttonText = result.buttonText;
        this.backgroundUrl = result.backgroundUrl;
        this.isEditModalOpen = false;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Ошибка сохранения блока Hero:', err),
    });
  }

  onCloseHeroModal() {
    this.isEditModalOpen = false;
  }
}

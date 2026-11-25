import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../core/media';
import { HeroInfo } from '../../core/content';

@Component({
  selector: 'app-hero-edit-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hero-edit-modal.html',
})
export class HeroEditModalComponent implements OnInit {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() buttonText = '';
  @Input() currentBackgroundUrl = '';

  @Output() save = new EventEmitter<HeroInfo>();
  @Output() close = new EventEmitter<void>();

  backgroundUrl = '';
  uploading = false;

  constructor(
    private mediaService: MediaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.backgroundUrl = this.currentBackgroundUrl;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.uploading = true;
    this.mediaService.uploadFile(file, 'hero').subscribe({
      next: (response) => {
        this.backgroundUrl = response.url;
        this.uploading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка загрузки фона', err);
        this.uploading = false;
        this.cdr.detectChanges();
      },
    });
  }

  onSave() {
    this.save.emit({
      title: this.title,
      subtitle: this.subtitle,
      buttonText: this.buttonText,
      backgroundUrl: this.backgroundUrl,
    });
  }

  onClose() {
    this.close.emit();
  }
}

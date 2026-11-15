import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../core/media';

@Component({
  selector: 'app-about-edit-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './about-edit-modal.html',
  styleUrl: './about-edit-modal.css',
})
export class AboutEditModalComponent {
  @Input() masterName = '';
  @Input() experience = '';
  @Input() description = '';
  @Input() currentPhotoUrl = '';

  @Output() save = new EventEmitter<{
    masterName: string;
    experience: string;
    description: string;
    photoUrl: string;
  }>();
  @Output() close = new EventEmitter<void>();

  photoUrl = '';
  uploading = false;

  constructor(
    private mediaService: MediaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.photoUrl = this.currentPhotoUrl;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.uploading = true;
    this.mediaService.uploadFile(file, 'master').subscribe({
      next: (response) => {
        this.photoUrl = response.url;
        this.uploading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка загрузки', err);
        this.uploading = false;
        this.cdr.detectChanges();
      },
    });
  }

  onSave() {
    this.save.emit({
      masterName: this.masterName,
      experience: this.experience,
      description: this.description,
      photoUrl: this.photoUrl,
    });
  }

  onClose() {
    this.close.emit();
  }
}

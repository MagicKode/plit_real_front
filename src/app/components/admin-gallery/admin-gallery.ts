import { Component, OnInit } from '@angular/core';
import { MediaFile, MediaService } from '../../core/media';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-gallery.html',
  styleUrl: './admin-gallery.css'
})
export class AdminGalleryComponent implements OnInit {
  files: MediaFile[] = [];
  uploading = false;
  selectedCategory: string = 'bathroom';

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    this.mediaService.getAllFiles().subscribe(data => {
      this.files = data;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.uploading = true;
    this.mediaService.uploadFile(file, this.selectedCategory).subscribe({
      next: () => {
        this.uploading = false;
        this.loadFiles();
      },
      error: (err) => {
        this.uploading = false;
        console.error('Ошибка загрузки', err);
      }
    });
  }


  // --- Удаление файла ---
  deleteFile(id: number): void {
    if (confirm('Удалить это фото?')) {
      this.mediaService.deleteFile(id).subscribe(() => {
        this.loadFiles(); // Обновляем список после удаления
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MediaService, MediaFile } from '../../core/media';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-gallery.html',
  styleUrl: './admin-gallery.css'
})
export class AdminGalleryComponent implements OnInit {
  files: MediaFile[] = [];
  uploading = false;

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
    this.mediaService.uploadFile(file).subscribe({
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
}

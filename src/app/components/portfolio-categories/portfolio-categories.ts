import { afterNextRender, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../core/auth';
import { MediaService, PortfolioCategory } from '../../core/media';

@Component({
  selector: 'app-portfolio-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio-categories.html',
  styleUrl: './portfolio-categories.css',
})
export class PortfolioCategoriesComponent {
  activeCategory: PortfolioCategory | null = null;
  selectedImage: string | null = null;
  selectedImageIndex: number | null = null;

  // Состояние модалки создания категории и загрузки
  isAddCategoryModalOpen = false;
  newCategoryName = '';
  newCategoryCoverUrl = '';
  uploadingCover = false;
  uploadingPhotos = false;

  // Стартовый демо-набор (отображается, пока в БД нет ни одной категории)
  categories: PortfolioCategory[] = [];

  constructor(
    public authService: AuthService,
    private mediaService: MediaService,
    private cdr: ChangeDetectorRef,
  ) {
    afterNextRender(() => {
      this.loadCategories();
    });
  }

  loadCategories(reopenCategoryId?: number) {
    this.mediaService.getCategories().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.categories = data;
          if (reopenCategoryId) {
            this.activeCategory = this.categories.find((c) => c.id === reopenCategoryId) || null;
          }
        } else if (reopenCategoryId) {
          this.categories = [];
          this.activeCategory = null;
        }
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Ошибка загрузки категорий портфолио:', err),
    });
  }

  // Подставляет адрес бэкенда только для загруженных файлов (/uploads/...)
  getFullImageUrl(url: string): string {
    if (!url) return 'portfolio/job1.jpg';
    return url.startsWith('/uploads') ? `http://localhost:8080${url}` : url;
  }

  // --- Навигация по галерее ---
  openCategory(category: PortfolioCategory) {
    this.activeCategory = category;
  }

  closeCategory() {
    this.activeCategory = null;
    this.selectedImage = null;
    this.selectedImageIndex = null;
  }

  openImage(url: string, index?: number) {
    this.selectedImage = this.getFullImageUrl(url);
    if (index !== undefined) {
      this.selectedImageIndex = index;
    } else if (this.activeCategory?.works) {
      this.selectedImageIndex = this.activeCategory.works.findIndex(
        (w) => this.getFullImageUrl(w.url) === this.selectedImage,
      );
    }
  }

  closeImage() {
    this.selectedImage = null;
    this.selectedImageIndex = null;
  }

  prevImage(event?: Event) {
    event?.stopPropagation();
    const works = this.activeCategory?.works;
    if (!works || works.length <= 1 || this.selectedImageIndex === null) return;

    this.selectedImageIndex = (this.selectedImageIndex - 1 + works.length) % works.length;
    this.selectedImage = this.getFullImageUrl(works[this.selectedImageIndex].url);
  }

  nextImage(event?: Event) {
    event?.stopPropagation();
    const works = this.activeCategory?.works;
    if (!works || works.length <= 1 || this.selectedImageIndex === null) return;

    this.selectedImageIndex = (this.selectedImageIndex + 1) % works.length;
    this.selectedImage = this.getFullImageUrl(works[this.selectedImageIndex].url);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.selectedImage) return;

    if (event.key === 'ArrowLeft') {
      this.prevImage();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'Escape') {
      this.closeImage();
    }
  }

  // --- Управление категориями (Режим мастера) ---
  openAddCategoryModal() {
    this.newCategoryName = '';
    this.newCategoryCoverUrl = '';
    this.isAddCategoryModalOpen = true;
  }

  closeAddCategoryModal() {
    this.isAddCategoryModalOpen = false;
  }

  onCoverSelected(event: any) {
    const file: File | undefined = event.target.files?.[0];
    if (!file) return;

    this.uploadingCover = true;
    this.mediaService
      .uploadFile(file, 'category-cover', this.newCategoryName || 'Обложка')
      .subscribe({
        next: (res) => {
          this.newCategoryCoverUrl = res.url;
          this.uploadingCover = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Ошибка загрузки обложки:', err);
          this.uploadingCover = false;
          this.cdr.detectChanges();
        },
      });
  }

  saveNewCategory() {
    if (!this.newCategoryName.trim() || !this.newCategoryCoverUrl) return;

    this.mediaService
      .createCategory({
        name: this.newCategoryName.trim(),
        coverImage: this.newCategoryCoverUrl,
      })
      .subscribe({
        next: () => {
          this.isAddCategoryModalOpen = false;
          this.loadCategories();
        },
        error: (err) => console.error('Ошибка создания категории:', err),
      });
  }

  deleteCategory(event: Event, category: PortfolioCategory) {
    event.stopPropagation();
    if (category.id < 0) {
      this.categories = this.categories.filter((c) => c.id !== category.id);
      return;
    }

    if (!confirm(`Удалить категорию «${category.name}» и все фото в ней?`)) return;

    this.mediaService.deleteCategory(category.id).subscribe({
      next: () => this.loadCategories(),
      error: (err) => console.error('Ошибка удаления категории:', err),
    });
  }

  // --- Управление фото внутри категории (Режим мастера) ---
  onPhotosSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files || files.length === 0 || !this.activeCategory) return;

    const currentCat = this.activeCategory;
    this.uploadingPhotos = true;

    const uploads = Array.from(files).map((file) =>
      this.mediaService.uploadFile(file, currentCat.name, currentCat.name),
    );

    forkJoin(uploads).subscribe({
      next: () => {
        this.uploadingPhotos = false;
        event.target.value = '';
        this.loadCategories(currentCat.id);
      },
      error: (err) => {
        console.error('Ошибка загрузки фото работ:', err);
        this.uploadingPhotos = false;
        this.cdr.detectChanges();
      },
    });
  }

  deleteWork(event: Event, workId: number) {
    event.stopPropagation();
    if (!this.activeCategory) return;

    if (workId < 0) {
      this.activeCategory.works = this.activeCategory.works.filter((w) => w.id !== workId);
      return;
    }

    if (!confirm('Удалить это фото?')) return;

    const currentCatId = this.activeCategory.id;
    this.mediaService.deleteFile(workId).subscribe({
      next: () => this.loadCategories(currentCatId),
      error: (err) => console.error('Ошибка удаления фото:', err),
    });
  }
}

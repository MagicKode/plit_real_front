import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MediaFile {
  id: number;
  url: string;
  originalName: string;
  category?: string;
  title?: string;
}

export interface UploadResponse {
  id: number;
  url: string;
  category: string;
}

export interface PortfolioWork {
  id: number;
  url: string;
  originalName?: string;
  category?: string;
  title?: string;
}

export interface PortfolioCategory {
  id: number;
  name: string;
  coverImage: string;
  works: PortfolioWork[];
}

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  uploadFile(file: File, category: string, title?: string): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    if (title) {
      formData.append('title', title);
    }
    return this.http.post<UploadResponse>(`${this.baseUrl}/media/upload`, formData);
  }

  getAllFiles(): Observable<MediaFile[]> {
    return this.http.get<MediaFile[]>(`${this.baseUrl}/media`);
  }

  deleteFile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/media/${id}`);
  }

  getCategories(): Observable<PortfolioCategory[]> {
    return this.http.get<PortfolioCategory[]>(`${this.baseUrl}/portfolio/categories`);
  }

  createCategory(data: { name: string; coverImage: string }): Observable<PortfolioCategory> {
    return this.http.post<PortfolioCategory>(`${this.baseUrl}/portfolio/categories`, data);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/portfolio/categories/${id}`);
  }
}

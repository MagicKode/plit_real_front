import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MediaFile {
  id: number;
  url: string;
  originalName: string;
}

export interface UploadResponse {
  id: number;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = 'http://localhost:8080/api/v1/media';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResponse>(`${this.apiUrl}/upload`, formData);
  }

  getAllFiles(): Observable<MediaFile[]> {
    return this.http.get<MediaFile[]>(this.apiUrl);
  }
}

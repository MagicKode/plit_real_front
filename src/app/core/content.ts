import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceItem } from '../components/services-edit-modal/services-edit-modal';

export interface AboutInfo {
  id?: number;
  masterName: string;
  experience: string;
  description: string;
  photoUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getAbout(): Observable<AboutInfo> {
    return this.http.get<AboutInfo>(`${this.apiUrl}/about`);
  }

  updateAbout(data: AboutInfo): Observable<AboutInfo> {
    return this.http.put<AboutInfo>(`${this.apiUrl}/about`, data);
  }

  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiUrl}/services`);
  }

  updateServices(services: ServiceItem[]): Observable<ServiceItem[]> {
    return this.http.put<ServiceItem[]>(`${this.apiUrl}/services`, services);
  }
}

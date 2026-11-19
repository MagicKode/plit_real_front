import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ServiceItem } from '../components/services-edit-modal/services-edit-modal';

export interface AboutInfo {
  id?: number;
  masterName: string;
  experience: string;
  description: string;
  photoUrl: string;
}

export interface PriceItem {
  id?: number;
  service: string;
  price: string;
  unit: string;
}

interface BackendPriceItem {
  id?: number;
  serviceName: string;
  price: string;
  currency: string;
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

  getPrices(): Observable<PriceItem[]> {
    return this.http.get<BackendPriceItem[]>(`${this.apiUrl}/prices`).pipe(
      map((items) =>
        items.map((item) => ({
          id: item.id,
          service: item.serviceName,
          price: item.price,
          unit: item.currency || 'руб/м²',
        }))
      )
    );
  }

  updatePrices(prices: PriceItem[]): Observable<PriceItem[]> {
    // Преобразуем модели фронтенда в формат PriceEntity для Spring Boot
    const payload: BackendPriceItem[] = prices
      .filter((p) => p.service.trim() !== '')
      .map((p) => ({
        id: p.id,
        serviceName: p.service,
        price: p.price,
        currency: p.unit,
      }));

    return this.http.put<BackendPriceItem[]>(`${this.apiUrl}/prices`, payload).pipe(
      map((items) =>
        items.map((item) => ({
          id: item.id,
          service: item.serviceName,
          price: item.price,
          unit: item.currency || 'руб/м²',
        }))
      )
    );
  }
}

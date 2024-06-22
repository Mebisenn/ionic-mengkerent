import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CarRecommendationsService {
  private apiUrl = 'https://www.sipelantis.com/api/car-recommendations';  // Sesuaikan URL jika perlu

  constructor(private http: HttpClient, private storage: Storage) {}

  async getCarRecommendations(): Promise<Observable<any>> {
    const token = await this.storage.get('auth-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular'; // Tambahkan import Storage

@Injectable({
  providedIn: 'root'
})
export class TermsService {
  private apiUrl = 'https://www.sipelantis.com/api/terms'; // Pastikan ini sesuai dengan route di Laravel

  constructor(private http: HttpClient, private storage: Storage) {} // Inject Storage

  async getTerms(): Promise<Observable<any>> {
    const token = await this.storage.get('auth-token'); // Ambil token dari storage

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Tambahkan header otorisasi
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}

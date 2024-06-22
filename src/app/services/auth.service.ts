import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://www.sipelantis.com/api/logout'; // Ganti dengan URL API Laravel Anda

  constructor(private http: HttpClient) { }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}`, {});
  }
}

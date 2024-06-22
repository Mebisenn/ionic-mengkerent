import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://www.sipelantis.com/api';

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap(async (response: any) => {
        if (response.token) {
          await this.storage.set('auth-token', response.token);
        }
      })
    );
  }
}

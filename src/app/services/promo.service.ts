import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  private apiUrl = 'https://www.sipelantis.com/api/data-content';

  constructor(private http: HttpClient, private storage: Storage) { }

  async getPromo(): Promise<any> {
    try {
      const token = await this.storage.get('auth-token');
      if (!token) {
        throw new Error('Unauthorized: Token not found.');
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(this.apiUrl, { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return throwError(() => new Error('Unauthorized: Please login to access promos.'));
          } else {
            return throwError(() => new Error('Error fetching promo: ' + error.message));
          }
        })
      ).toPromise();
    } catch (error: any) {
      throw new Error('Error fetching promo: ' + error.message);
    }
  }

  addPromo(title: string, content: string): Observable<any> {
    const addUrl = 'https://www.sipelantis.com/api/promo/add';
    return this.http.post(addUrl, { title, content }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Error adding promo: ' + error.message));
      })
    );
  }
}
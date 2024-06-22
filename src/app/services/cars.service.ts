import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private apiUrl = 'https://www.sipelantis.com/api/carunits';

  constructor(private http: HttpClient, private storage: Storage) { }

  getCars(): Observable<any> {
    return from(this.storage.get('auth-token')).pipe(
      switchMap(token => {
        if (!token) {
          return throwError('No token found');
        }
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(this.apiUrl, { headers }).pipe(
          catchError(error => {
            console.error('HTTP error:', error);
            return throwError(error);
          })
        );
      }),
      catchError(error => {
        console.error('Storage error:', error);
        return throwError(error);
      })
    );
  }

  getCarDetails(carId: number): Observable<any> { // Ganti nama metode menjadi getCarDetails
    return from(this.storage.get('auth-token')).pipe(
      switchMap(token => {
        if (!token) {
          return throwError('No token found');
        }
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const url = `${this.apiUrl}/${carId}`;
        return this.http.get<any>(url, { headers }).pipe(
          catchError(error => {
            console.error('HTTP error:', error);
            return throwError(error);
          })
        );
      }),
      catchError(error => {
        console.error('Storage error:', error);
        return throwError(error);
      })
    );
  }
}

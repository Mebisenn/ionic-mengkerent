import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private storage: Storage,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    await this.storage.create(); // Make sure storage is created

    try {
      const token = await this.storage.get('auth-token');
      if (token) {
        return true; // Continue navigation if token exists (user is logged in)
      } else {
        this.router.navigate(['/login']); // Redirect to login page if no token
        return false;
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      this.router.navigate(['/login']); // Redirect to login page if there's an error
      return false;
    }
  }
}
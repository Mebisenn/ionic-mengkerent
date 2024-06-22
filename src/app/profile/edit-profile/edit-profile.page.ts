import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user: any = {
    name: '',
    email: '',
    password: '',
    gender: '',
    no_telfon: '',
    pekerjaan: '',
    alamat: ''
  };
  userId: number | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const token = await this.storage.get('auth-token');
    this.userId = await this.storage.get('user-id');

    console.log('Retrieved token:', token);
    console.log('Retrieved userId:', this.userId);

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    if (!this.userId) {
      console.error('No user ID found');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get(`https://www.sipelantis.com/api/users/${this.userId}`, { headers })
      .subscribe(
        (response: any) => {
          this.user = response.user;
          console.log('User profile loaded:', this.user);
        },
        error => {
          console.error('Error loading user profile:', error);
        }
      );
  }

  async saveProfile() {
    const token = await this.storage.get('auth-token');

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.put(`https://www.sipelantis.com/api/users/${this.userId}`, this.user, { headers })
      .subscribe(
        async (response: any) => {
          const alert = await this.alertController.create({
            header: 'Success',
            message: 'Profile updated successfully',
            buttons: ['OK']
          });
          await alert.present();
          this.router.navigate(['/profile']);
        },
        async error => {
          console.error('Error saving user profile:', error);
          if (error.status === 422) {
            console.error('Validation error:', error.error);
          }
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'There was an error updating your profile. Please try again.',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
  }

  home() {
    this.router.navigate(['/home']);
  }

  order() {
    this.router.navigate(['/cars']);
  }

  transaksi() {
    this.router.navigate(['/transaksi']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }
}
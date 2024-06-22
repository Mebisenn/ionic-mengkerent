import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { TermsService } from '../../services/terms.service'; // Import TermsService
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = null; // Inisialisasi sebagai null
  userId: number | null = null; // Menggunakan nilai default null
  terms: string = ''; // Variable untuk menyimpan syarat dan ketentuan

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
    private authService: AuthService, // Inject AuthService
    private termsService: TermsService, // Inject TermsService
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.initStorage();
    await this.loadUserProfile();
    await this.loadTerms(); // Panggil method untuk load syarat dan ketentuan
  }

  async initStorage() {
    await this.storage.create();
    console.log('Storage initialized');
  }

  async loadUserProfile() {
    const token = await this.storage.get('auth-token');
    console.log('Retrieved token:', token);

    this.userId = await this.storage.get('user-id'); // Ambil user ID dari storage
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
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get(`https://www.sipelantis.com/api/users/${this.userId}`, { headers })
      .subscribe(
        (response: any) => {
          this.user = response.user;
          console.log('User profile loaded:', this.user);
        },
        (error) => {
          console.error('Error loading user profile:', error);
        }
      );
  }

  async loadTerms() {
    try {
      const termsObservable = await this.termsService.getTerms();
      termsObservable.subscribe(
        (response: any) => {
          this.terms = response.data.map((term: any) => term.syarat_ketentuan).join('<br><br>'); // Gabungkan semua syarat dan ketentuan
          console.log('Terms loaded:', this.terms);
        },
        (error) => {
          console.error('Error loading terms:', error);
        }
      );
    } catch (error) {
      console.error('Failed to load terms', error);
    }
  }

  goEdit() {
    this.router.navigate(['/edit-profile']);
  }

  async LogOut() {
    try {
      const token = await this.storage.get('auth-token');
      console.log('Token:', token); // Pastikan token ini ada dan valid
  
      if (!token) {
        console.error('No authentication token found');
        // Tampilkan pesan kesalahan kepada pengguna jika token tidak ditemukan
        return;
      }
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
  
      await this.http.post('https://www.sipelantis.com/api/logout', {}, { headers }).toPromise(); // Kirim permintaan logout
  
      // Hapus token dari penyimpanan
      await this.storage.remove('auth-token');
      await this.storage.remove('user-id'); // Hapus user ID jika perlu

      const alert = await this.alertController.create({
        header: 'Logout',
        message: 'Anda telah logout',
        buttons: ['OK']
      });
      await alert.present();
  
      // Navigasi ke halaman login setelah berhasil logout
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Failed to logout', error);
      // Tambahkan penanganan kesalahan lain jika diperlukan
    }
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
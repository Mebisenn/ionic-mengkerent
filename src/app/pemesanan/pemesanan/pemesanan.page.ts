import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pemesanan',
  templateUrl: './pemesanan.page.html',
  styleUrls: ['./pemesanan.page.scss'],
})
export class PemesananPage {
  car: any;
  selectedDuration: string = '';
  selectedService: string = 'antar'; // Default value
  alamat: string = '';
  number: number = 1; // Default value for custom duration

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
    const carData = localStorage.getItem('selectedCar');
    if (carData) {
      this.car = JSON.parse(carData);
    } else {
      console.error('Car data is not found in localStorage');
      // Handle case where car data is not found (optional)
    }
  }

  durationChanged() {
    console.log('Selected duration:', this.selectedDuration);
  }

  serviceChanged() {
    console.log('Selected service:', this.selectedService);
  }

  increment() {
    this.number++;
  }

  decrement() {
    if (this.number > 1) {
      this.number--;
    }
  }

  async booking() {
    if (!this.car || !this.car.id || !this.selectedDuration || !this.selectedService || (this.selectedService !== 'self' && !this.alamat)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Lengkapi pengisian data.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Pastikan `durasi` dan `pelayanan` dikirim sesuai dengan format yang diharapkan oleh server
    const orderData = {
      durasi: this.selectedDuration === 'custom' ? `${this.number}` : this.selectedDuration,
      pelayanan: this.selectedService,
      alamat: this.alamat
    };

    // Log the data being sent
    console.log('Order Data:', orderData);

    // Ambil token dari storage
    const token = await this.storage.get('auth-token');

    if (!token) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No authentication token found.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Set header dengan token dan Content-Type
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Ensure content type is JSON
    });

    // Kirim permintaan POST ke API
    this.http.post(`https://www.sipelantis.com/api/orders/${this.car.id}`, orderData, { headers })
      .subscribe(
        async response => {
          console.log('Order successful:', response);
          const alert = await this.alertController.create({
            header: 'Success',
            message: 'Pemesanan berhasil.',
            buttons: ['OK']
          });
          await alert.present();
          // Handle successful order (e.g., navigate to a confirmation page)
          this.router.navigate(['/transaksi']);
        },
        async error => {
          console.error('Error creating order:', error);
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Error creating order. Please try again.',
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
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
})
export class TransaksiPage implements OnInit {
  selectedSegment: string = 'booking';
  transactions: any = {
    booking: [],
    proses: [],
    selesai: []
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  ngOnInit() {
    this.loadTransactions();
  }

  async loadTransactions() {
    const token = await this.storage.get('auth-token');
    const userId = await this.storage.get('user-id');

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    if (!userId) {
      console.error('No user ID found');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(`https://www.sipelantis.com/api/users/${userId}/transactions`, { headers })
      .subscribe(
        response => {
          this.transactions.booking = response.booking;
          this.transactions.proses = response.proses;
          console.log('Booking Transactions:', this.transactions.booking);
          console.log('Proses Transactions:', this.transactions.proses);
        },
        error => {
          console.error('Error loading transactions:', error);
        }
      );

    this.http.get<any>(`https://www.sipelantis.com/api/order-history/${userId}`, { headers })
      .subscribe(
        response => {
          this.transactions.selesai = response.orderHistories;
          console.log('Order Histories:', this.transactions.selesai);
        },
        error => {
          console.error('Error loading order histories:', error);
        }
      );
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  async cancelTransaction(transactionId: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Cancel',
      message: 'Are you sure you want to cancel this transaction?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: async () => {
            const token = await this.storage.get('auth-token');
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${token}`
            });

            this.http.delete(`https://www.sipelantis.com/api/order/${transactionId}/cancel`, { headers })
              .subscribe(
                async response => {
                  const toast = await this.toastController.create({
                    message: 'Transaction cancelled successfully.',
                    duration: 2000,
                    color: 'success'
                  });
                  toast.present();
                  this.loadTransactions(); // Refresh the transactions list
                },
                async error => {
                  const toast = await this.toastController.create({
                    message: 'Failed to cancel transaction.',
                    duration: 2000,
                    color: 'danger'
                  });
                  toast.present();
                }
              );
          }
        }
      ]
    });

    await alert.present();
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
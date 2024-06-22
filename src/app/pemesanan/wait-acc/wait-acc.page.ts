import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var snap: any;

@Component({
  selector: 'app-wait-acc',
  templateUrl: './wait-acc.page.html',
  styleUrls: ['./wait-acc.page.scss'],
})
export class WaitAccPage {

  selectedPaymentMethod: string = '';

  constructor(private platform: Platform, private http: HttpClient) {}

  onPaymentMethodChange(event: any) {
    this.selectedPaymentMethod = event.detail.value;
    console.log('Selected payment method:', this.selectedPaymentMethod);
  }

  pay() {
    console.log('Button clicked');
    if (this.selectedPaymentMethod === 'lainnya') {
      this.platform.ready().then(() => {
        this.getTransactionToken().subscribe((response: any) => {
          const transactionToken = response.token;
          snap.pay(transactionToken, {
            onSuccess: function(result: any) {
              console.log('success', result);
              // Tambahkan logika jika pembayaran berhasil
            },
            onPending: function(result: any) {
              console.log('pending', result);
              // Tambahkan logika jika pembayaran pending
            },
            onError: function(result: any) {
              console.error('error', result);
              // Tambahkan logika jika pembayaran error
            },
            onClose: function() {
              console.log('customer closed the popup without finishing the payment');
              // Tambahkan logika jika pengguna menutup popup tanpa menyelesaikan pembayaran
            }
          });
        });
      });
    } else {
      console.log('Metode pembayaran lain dipilih');
    }
  }

  getTransactionToken() {
    const url = 'https://app.sandbox.midtrans.com/snap/v1/transactions';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa('Ganti Dengan server key anda')}` // Gantilah dengan Server Key Anda
    });

    const body = {
      transaction_details: {
        order_id: `order-${Date.now()}`,
        gross_amount: 300000, // jumlah total transaksi
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: 'Budi',
        last_name: 'Pratama',
        email: 'budi.pra@example.com',
        phone: '08111222333',
      },
    };

    return this.http.post(url, body, { headers });
  }
}

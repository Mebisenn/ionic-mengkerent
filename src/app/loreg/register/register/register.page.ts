import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  gender: string = '';
  no_telfon: string = '';
  pekerjaan: string = '';
  alamat: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  async onSubmit() {
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Registrasi Gagal',
        message: 'Password dan Konfirmasi Password tidak sesuai.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const registerData = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      gender: this.gender,
      no_telfon: this.no_telfon,
      pekerjaan: this.pekerjaan,
      alamat: this.alamat
    };

    this.http.post<any>('https://www.sipelantis.com/api/register', registerData)
      .subscribe(
        async response => {
          console.log('Registrasi berhasil', response);
          await this.showAlert('Registrasi Berhasil', 'Akun Anda berhasil didaftarkan.');
          this.router.navigate(['/login']);
        },
        async error => {
          console.error('Registrasi gagal', error);
          await this.showAlert('Registrasi Gagal', 'Terjadi kesalahan saat registrasi. Silakan coba lagi.');
        }
      );
  }

  onSubmits() {
    this.router.navigate(['/login']);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
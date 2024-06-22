import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    // Tambahkan properti lain jika ada dalam response
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient,
    private storage: Storage
  ) {
    this.storage.create();
  }

  ngOnInit() {}

  async onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post<LoginResponse>('https://www.sipelantis.com/api/login', loginData).subscribe(
      async response => {
        console.log(response);
        const token = response.token;
        const userId = response.user.id;
        
        await this.storage.set('auth-token', token);
        await this.storage.set('user-id', userId); // Simpan userId di Storage
        this.router.navigate(['/home']);
      },
      async error => {
        console.error('Login failed', error);
        let errorMessage = 'Invalid email or password. Please try again.';
        
        if (error.status === 401) {
          errorMessage = 'Unauthorized access. Only users can login.';
        }
        
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: errorMessage,
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  onSubmits() {
    this.router.navigate(['/reqotp']);
  }

  register() {
    this.router.navigate(["/register"]);
  }
}
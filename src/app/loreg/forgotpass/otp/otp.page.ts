import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  otp: string = "";

  constructor(
    public loadingCtrl: LoadingController,
    public toastsCtrl: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.setIpFocus();
  }

  setIpFocus() {
    for (let i = 1; i <= 6; i++){
      const element = document.getElementById("ip" + i);
      if (element !== null) {
        if ((this.otp.length + 1) === i) {
          element.style.background = "var(--ion-color-dark)";
        } else {
          element.style.background = "var(--ion-color-light)";
        }
      }
    }
  }
  

  clear(){
    this.otp = "";
    this.setIpFocus();
  }

  back(){
    this.otp = this.otp.slice(0, -1);
    this.setIpFocus();
  }

  set(number: string){
    this.otp += number;
    this.setIpFocus();

    if(this.otp.length == 6){
      this.presentLoading();
      this.checkOTP();
    }
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Verifying OTP...',
      spinner: "circular"
    });
    await loading.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastsCtrl.create({
      message: message,
      color: color,
      duration: 1000,
      position: "middle",
    });
    toast.present();
  }

  checkOTP() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();

      if(this.otp == "123456") {
        this.presentToast("OTP Verified", "success");
        this.router.navigateByUrl('/forgotpass');
      }
      else {
        this.presentToast("Invalid OTP", "danger");
      }
    }, 2000);
  }
}

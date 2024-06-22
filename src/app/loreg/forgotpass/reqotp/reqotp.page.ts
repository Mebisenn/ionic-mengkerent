import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reqotp',
  templateUrl: './reqotp.page.html',
  styleUrls: ['./reqotp.page.scss'],
})
export class ReqotpPage implements OnInit {

  constructor(
    private router : Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(){

    this.router.navigate(["/otp"]);
  }

}

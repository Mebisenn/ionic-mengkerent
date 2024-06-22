import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reqotps',
  templateUrl: './reqotps.page.html',
  styleUrls: ['./reqotps.page.scss'],
})
export class ReqotpsPage implements OnInit {

  constructor(
    private router : Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(){

    this.router.navigate(["/otps"]);
  }


}

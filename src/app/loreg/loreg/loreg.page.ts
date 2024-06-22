import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loreg',
  templateUrl: './loreg.page.html',
  styleUrls: ['./loreg.page.scss'],
})
export class LoregPage implements OnInit {

  constructor(
    private router : Router,
  ) { }

  ngOnInit() {
  }

  
  onSubmit(){

    this.router.navigate(["/login"]);
  }
  onSubmits(){

    this.router.navigate(["/register"]);
  }

}

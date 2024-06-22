import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public router: Router
  ) {
    // this.initializeApp();
  }

  // initializeApp(){
  //   this.router.navigateByUrl('splash');
  // }
}

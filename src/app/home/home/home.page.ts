import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarRecommendationsService } from '../../services/car-recommendations.service';
import { PromoService } from '../../services/promo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  recommendedCars: any[] = [];
  baseUrl: string = 'https://www.sipelantis.com/images/';
  car: any;
  promoTitle: string = '';
  promoContent: string = '';

  constructor(
    private router: Router,
    private carRecommendationsService: CarRecommendationsService,
    private promoService: PromoService
  ) {}

  ngOnInit() {
    this.loadCarRecommendations();
    this.loadPromo();
  }

  async loadCarRecommendations() {
    try {
      const response$ = await this.carRecommendationsService.getCarRecommendations();
      response$.subscribe(
        (response: any) => {
          console.log('API Response:', response);
          // Filter recommended cars to only include those that are available
          this.recommendedCars = response.data.recommendedCars.filter((car: any) => car.car_unit && car.car_unit.status === 'Unit Tersedia')
            .map((car: any) => ({
              ...car,
              car_unit: {
                ...car.car_unit,
                car_photo: this.baseUrl + car.car_unit.car_photo
              }
            }));
          console.log('Recommended Cars:', this.recommendedCars);
        },
        (error: any) => {
          console.error('Error fetching car recommendations:', error);
        }
      );
    } catch (error: any) {
      console.error('Error fetching car recommendations:', error);
    }
  }

  async loadPromo() {
    try {
      const response = await this.promoService.getPromo();
      console.log('Promo API Response:', response);
  
      // Assuming response contains data inside the 'data' property
      if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
        const promo = response.data[0];
        this.promoTitle = promo.title;
        this.promoContent = promo.content;
      } else {
        console.error('Invalid promo data format');
      }
    } catch (error: any) {
      if (typeof error === 'string' && error.includes('Unauthorized')) {
        console.error('Unauthorized: Please login to access promos.');
      } else {
        console.error('Error fetching promo:', error);
      }
    }
  }  

  SwiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  setSelectedCar(car: any) {
    this.car = car;
  }

  // Menggunakan fungsi navigate dengan parameter untuk kategori mobil
  onSubmits(car_category: string) {
    this.router.navigate(['/cars', car_category.toLowerCase()]);
  }

  goToDetails(carId: number) {
    this.router.navigate(['/details', carId]);
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
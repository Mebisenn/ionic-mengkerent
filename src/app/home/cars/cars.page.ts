import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {
  cars: any[] = [];
  filteredCars: any[] = [];
  selectedCategory: string = 'all';
  searchQuery: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute untuk mendapatkan parameter URL
    private carsService: CarsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedCategory = params['car_category'] || 'all'; // Menangkap parameter car_category dari URL
      this.loadCars();
    });
  }

  loadCars() {
    this.carsService.getCars().subscribe(
      (data) => {
        console.log('Data received from API:', data); // Untuk debugging

        if (data && data.data) {
          console.log('All cars:', data.data); // Untuk debugging

          // Filter hanya mobil dengan status 'Unit Tersedia'
          this.cars = data.data.filter((car: any) => car.status === 'Unit Tersedia');
          console.log('Available cars:', this.cars); // Untuk debugging
          this.filterCars();
        } else {
          console.error('Unexpected API response format:', data); // Untuk debugging
        }
      },
      (error) => {
        console.error('Error loading cars:', error); // Untuk debugging
      }
    );
  }

  filterCars() {
    this.filteredCars = this.cars.filter(car => {
      const matchesCategory = this.selectedCategory === 'all' || (car.car_category && car.car_category.toLowerCase() === this.selectedCategory.toLowerCase());
      const matchesSearch = car.nama_mobil.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    console.log('Filtered cars:', this.filteredCars); // Untuk debugging
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
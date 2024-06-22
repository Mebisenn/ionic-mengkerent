import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../../services/cars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  carId!: number;
  car: any;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private router : Router,
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    const id = params.get('id');
    if (id !== null) {
      this.carId = +id;
      this.loadCarDetails();
    } else {
      console.error('ID is null');
      // Handle case where 'id' is null (optional)
    }
  }

  loadCarDetails() {
    this.carsService.getCarDetails(this.carId).subscribe(
      (data: any) => {
        console.log('Car details:', data); // Log data yang diterima dari API
        this.car = data.data; // Assign 'data.data' karena respons API memiliki struktur 'message' dan 'data'
      },
      (error: any) => {
        console.error('Error fetching car details:', error);
        if (error.status === 404) {
          this.errorMessage = 'Mobil tidak ditemukan';
        } else {
          this.errorMessage = 'Terjadi kesalahan saat mengambil detail mobil';
        }
      }
    );
  }

  onSubmit() {
    // Simpan data mobil ke localStorage
    localStorage.setItem('selectedCar', JSON.stringify(this.car));

    // Arahkan ke halaman pemesanan
    this.router.navigate(['/pemesanan']);
  }

  home() {
    this.router.navigate(["/home"]);
  }

  order() {
    this.router.navigate(["/cars"]);
  }

  transaksi() {
    this.router.navigate(["/transaksi"]);
  }

  profile() {
    this.router.navigate(["/profile"]);
  }
}

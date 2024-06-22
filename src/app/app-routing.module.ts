import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cars',
    loadChildren: () => import('./home/cars/cars.module').then( m => m.CarsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cars/:car_category', // Rute dinamis untuk kategori mobil
    loadChildren: () => import('./home/cars/cars.module').then( m => m.CarsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./home/details/details.module').then( m => m.DetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./profile/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pemesanan',
    loadChildren: () => import('./pemesanan/pemesanan/pemesanan.module').then( m => m.PemesananPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'transaksi',
    loadChildren: () => import('./pemesanan/transaksi/transaksi.module').then( m => m.TransaksiPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'loreg',
    loadChildren: () => import('./loreg/loreg/loreg.module').then( m => m.LoregPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./loreg/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./loreg/register/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reqotp',
    loadChildren: () => import('./loreg/forgotpass/reqotp/reqotp.module').then( m => m.ReqotpPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./loreg/forgotpass/otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'forgotpass',
    loadChildren: () => import('./loreg/forgotpass/forgotpass/forgotpass.module').then( m => m.ForgotpassPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'wait-acc',
    loadChildren: () => import('./pemesanan/wait-acc/wait-acc.module').then( m => m.WaitAccPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reqotps',
    loadChildren: () => import('./loreg/register/reqotps/reqotps.module').then( m => m.ReqotpsPageModule)
  },
  {
    path: 'otps',
    loadChildren: () => import('./loreg/register/otps/otps.module').then( m => m.OtpsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
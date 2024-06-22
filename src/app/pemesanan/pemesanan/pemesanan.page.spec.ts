import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PemesananPage } from './pemesanan.page';

describe('PemesananPage', () => {
  let component: PemesananPage;
  let fixture: ComponentFixture<PemesananPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PemesananPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtpsPage } from './otps.page';

describe('OtpsPage', () => {
  let component: OtpsPage;
  let fixture: ComponentFixture<OtpsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReqotpPage } from './reqotp.page';

describe('ReqotpPage', () => {
  let component: ReqotpPage;
  let fixture: ComponentFixture<ReqotpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqotpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

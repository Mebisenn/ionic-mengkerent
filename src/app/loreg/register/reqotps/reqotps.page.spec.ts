import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReqotpsPage } from './reqotps.page';

describe('ReqotpsPage', () => {
  let component: ReqotpsPage;
  let fixture: ComponentFixture<ReqotpsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqotpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

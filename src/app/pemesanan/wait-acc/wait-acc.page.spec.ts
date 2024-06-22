import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitAccPage } from './wait-acc.page';

describe('WaitAccPage', () => {
  let component: WaitAccPage;
  let fixture: ComponentFixture<WaitAccPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitAccPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

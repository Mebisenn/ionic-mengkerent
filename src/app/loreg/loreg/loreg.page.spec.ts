import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoregPage } from './loreg.page';

describe('LoregPage', () => {
  let component: LoregPage;
  let fixture: ComponentFixture<LoregPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoregPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

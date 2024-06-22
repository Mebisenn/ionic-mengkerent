import { TestBed } from '@angular/core/testing';

import { CarRecommendationsService } from './car-recommendations.service';

describe('CarRecommendationsService', () => {
  let service: CarRecommendationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarRecommendationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

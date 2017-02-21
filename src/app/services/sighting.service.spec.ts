/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SightingService } from './sighting.service';

describe('SightingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SightingService]
    });
  });

  it('should ...', inject([SightingService], (service: SightingService) => {
    expect(service).toBeTruthy();
  }));
});

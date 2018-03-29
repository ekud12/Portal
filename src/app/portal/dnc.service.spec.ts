import { TestBed, inject } from '@angular/core/testing';

import { DncService } from './dnc.service';

describe('DncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DncService]
    });
  });

  it('should be created', inject([DncService], (service: DncService) => {
    expect(service).toBeTruthy();
  }));
});

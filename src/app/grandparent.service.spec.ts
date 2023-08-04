import { TestBed } from '@angular/core/testing';

import { GrandparentService } from './grandparent.service';

describe('GrandparentService', () => {
  let service: GrandparentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrandparentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PixService } from './pix.service';

describe('PixService', () => {
  let service: PixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ConfigFluxService } from './config-flux.service';

describe('ConfigFluxService', () => {
  let service: ConfigFluxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigFluxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

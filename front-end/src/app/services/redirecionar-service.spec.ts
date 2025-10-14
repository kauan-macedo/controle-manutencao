import { TestBed } from '@angular/core/testing';

import { RedirecionarService } from './redirecionar-service';

describe('RedirecionarService', () => {
  let service: RedirecionarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirecionarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

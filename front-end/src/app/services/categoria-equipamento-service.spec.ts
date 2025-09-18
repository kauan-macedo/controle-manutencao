import { TestBed } from '@angular/core/testing';

import { CategoriaEquipamentoService } from './categoria-equipamento-service';

describe('CategoriaEquipamentoService', () => {
  let service: CategoriaEquipamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaEquipamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

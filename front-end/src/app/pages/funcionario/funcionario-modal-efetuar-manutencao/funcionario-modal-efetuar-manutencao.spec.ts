import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioModalEfetuarManutencao } from './funcionario-modal-efetuar-manutencao';

describe('FuncionarioModalEfetuarManutencao', () => {
  let component: FuncionarioModalEfetuarManutencao;
  let fixture: ComponentFixture<FuncionarioModalEfetuarManutencao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioModalEfetuarManutencao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioModalEfetuarManutencao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

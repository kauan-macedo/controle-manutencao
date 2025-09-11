import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioModalRedirecionarManutencao } from './funcionario-modal-redirecionar-manutencao';

describe('FuncionarioModalRedirecionarManutencao', () => {
  let component: FuncionarioModalRedirecionarManutencao;
  let fixture: ComponentFixture<FuncionarioModalRedirecionarManutencao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioModalRedirecionarManutencao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioModalRedirecionarManutencao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

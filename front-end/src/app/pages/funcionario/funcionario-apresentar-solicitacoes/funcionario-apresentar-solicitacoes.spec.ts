import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioApresentarSolicitacoes } from './funcionario-apresentar-solicitacoes';

describe('FuncionarioApresentarSolicitacoes', () => {
  let component: FuncionarioApresentarSolicitacoes;
  let fixture: ComponentFixture<FuncionarioApresentarSolicitacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioApresentarSolicitacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioApresentarSolicitacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

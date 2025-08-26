import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioEfetuarOrcamento } from './funcionario-efetuar-orcamento';

describe('FuncionarioEfetuarOrcamento', () => {
  let component: FuncionarioEfetuarOrcamento;
  let fixture: ComponentFixture<FuncionarioEfetuarOrcamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioEfetuarOrcamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioEfetuarOrcamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

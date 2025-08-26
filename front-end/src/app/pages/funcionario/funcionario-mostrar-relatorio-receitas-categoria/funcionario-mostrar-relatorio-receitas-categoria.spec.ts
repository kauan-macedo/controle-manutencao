import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioMostrarRelatorioReceitasCategoria } from './funcionario-mostrar-relatorio-receitas-categoria';

describe('FuncionarioMostrarRelatorioReceitasCategoria', () => {
  let component: FuncionarioMostrarRelatorioReceitasCategoria;
  let fixture: ComponentFixture<FuncionarioMostrarRelatorioReceitasCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioMostrarRelatorioReceitasCategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioMostrarRelatorioReceitasCategoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioMostrarRelatorioReceitas } from './funcionario-mostrar-relatorio-receitas';

describe('FuncionarioMostrarRelatorioReceitas', () => {
  let component: FuncionarioMostrarRelatorioReceitas;
  let fixture: ComponentFixture<FuncionarioMostrarRelatorioReceitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioMostrarRelatorioReceitas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioMostrarRelatorioReceitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioMostrarFuncionarios } from './funcionario-mostrar-funcionarios';

describe('FuncionarioMostrarFuncionarios', () => {
  let component: FuncionarioMostrarFuncionarios;
  let fixture: ComponentFixture<FuncionarioMostrarFuncionarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioMostrarFuncionarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioMostrarFuncionarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

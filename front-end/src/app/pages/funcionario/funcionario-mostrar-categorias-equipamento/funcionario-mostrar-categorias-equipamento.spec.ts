import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioMostrarCategoriasEquipamento } from './funcionario-mostrar-categorias-equipamento';

describe('FuncionarioMostrarCategoriasEquipamento', () => {
  let component: FuncionarioMostrarCategoriasEquipamento;
  let fixture: ComponentFixture<FuncionarioMostrarCategoriasEquipamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioMostrarCategoriasEquipamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioMostrarCategoriasEquipamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioManterCategoriaEquipamento } from './funcionario-manter-categoria-equipamento';

describe('FuncionarioManterCategoriaEquipamento', () => {
  let component: FuncionarioManterCategoriaEquipamento;
  let fixture: ComponentFixture<FuncionarioManterCategoriaEquipamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioManterCategoriaEquipamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioManterCategoriaEquipamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioManterFuncionario } from './funcionario-manter-funcionario';

describe('FuncionarioManterFuncionario', () => {
  let component: FuncionarioManterFuncionario;
  let fixture: ComponentFixture<FuncionarioManterFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioManterFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioManterFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

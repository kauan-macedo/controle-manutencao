import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioPaginaInicial } from './funcionario-pagina-inicial';

describe('FuncionarioPaginaInicial', () => {
  let component: FuncionarioPaginaInicial;
  let fixture: ComponentFixture<FuncionarioPaginaInicial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioPaginaInicial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioPaginaInicial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioEfetuarManutencao } from './funcionario-efetuar-manutencao';

describe('FuncionarioEfetuarManutencao', () => {
  let component: FuncionarioEfetuarManutencao;
  let fixture: ComponentFixture<FuncionarioEfetuarManutencao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioEfetuarManutencao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioEfetuarManutencao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

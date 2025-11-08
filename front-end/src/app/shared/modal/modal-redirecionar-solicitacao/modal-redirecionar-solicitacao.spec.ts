import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRedirecionarSolicitacao } from './modal-redirecionar-solicitacao';

describe('ModalRedirecionarSolicitacao', () => {
  let component: ModalRedirecionarSolicitacao;
  let fixture: ComponentFixture<ModalRedirecionarSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRedirecionarSolicitacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRedirecionarSolicitacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarSolicitacao } from './modal-visualizar-solicitacao';

describe('ModalVisualizarSolicitacao', () => {
  let component: ModalVisualizarSolicitacao;
  let fixture: ComponentFixture<ModalVisualizarSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVisualizarSolicitacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVisualizarSolicitacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

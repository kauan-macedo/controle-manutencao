import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPagarSolicitacao } from './modal-pagar-solicitacao';

describe('ModalPagarSolicitacao', () => {
  let component: ModalPagarSolicitacao;
  let fixture: ComponentFixture<ModalPagarSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPagarSolicitacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPagarSolicitacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

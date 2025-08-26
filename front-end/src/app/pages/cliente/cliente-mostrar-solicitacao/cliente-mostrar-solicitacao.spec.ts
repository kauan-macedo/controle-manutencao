import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteMostrarSolicitacao } from './cliente-mostrar-solicitacao';

describe('ClienteMostrarSolicitacao', () => {
  let component: ClienteMostrarSolicitacao;
  let fixture: ComponentFixture<ClienteMostrarSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteMostrarSolicitacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteMostrarSolicitacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

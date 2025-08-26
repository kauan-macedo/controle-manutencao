import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCriarSolicitacao } from './cliente-criar-solicitacao';

describe('ClienteCriarSolicitacao', () => {
  let component: ClienteCriarSolicitacao;
  let fixture: ComponentFixture<ClienteCriarSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteCriarSolicitacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteCriarSolicitacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

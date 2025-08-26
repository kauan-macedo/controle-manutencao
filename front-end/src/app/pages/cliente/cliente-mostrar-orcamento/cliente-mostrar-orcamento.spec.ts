import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteMostrarOrcamento } from './cliente-mostrar-orcamento';

describe('ClienteMostrarOrcamento', () => {
  let component: ClienteMostrarOrcamento;
  let fixture: ComponentFixture<ClienteMostrarOrcamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteMostrarOrcamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteMostrarOrcamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

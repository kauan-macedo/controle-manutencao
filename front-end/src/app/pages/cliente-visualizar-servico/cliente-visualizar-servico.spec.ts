import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteVisualizarServico } from './cliente-visualizar-servico';

describe('ClienteVisualizarServico', () => {
  let component: ClienteVisualizarServico;
  let fixture: ComponentFixture<ClienteVisualizarServico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteVisualizarServico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteVisualizarServico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteRejeitarServico } from './cliente-rejeitar-servico';

describe('ClienteRejeitarServico', () => {
  let component: ClienteRejeitarServico;
  let fixture: ComponentFixture<ClienteRejeitarServico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteRejeitarServico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteRejeitarServico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

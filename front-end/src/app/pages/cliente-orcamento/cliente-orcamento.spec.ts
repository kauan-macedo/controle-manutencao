import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteOrcamento } from './cliente-orcamento';

describe('ClienteOrcamento', () => {
  let component: ClienteOrcamento;
  let fixture: ComponentFixture<ClienteOrcamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteOrcamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteOrcamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

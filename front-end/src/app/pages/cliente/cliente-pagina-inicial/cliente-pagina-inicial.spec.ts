import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePaginaInicial } from './cliente-pagina-inicial';

describe('ClientePaginaInicial', () => {
  let component: ClientePaginaInicial;
  let fixture: ComponentFixture<ClientePaginaInicial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientePaginaInicial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientePaginaInicial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

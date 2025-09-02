import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCliente } from './header-cliente';

describe('HeaderCliente', () => {
  let component: HeaderCliente;
  let fixture: ComponentFixture<HeaderCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

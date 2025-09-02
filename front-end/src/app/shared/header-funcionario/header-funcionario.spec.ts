import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFuncionario } from './header-funcionario';

describe('HeaderFuncionario', () => {
  let component: HeaderFuncionario;
  let fixture: ComponentFixture<HeaderFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

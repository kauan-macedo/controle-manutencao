import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioLayout } from './funcionario-layout';

describe('FuncionarioLayout', () => {
  let component: FuncionarioLayout;
  let fixture: ComponentFixture<FuncionarioLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

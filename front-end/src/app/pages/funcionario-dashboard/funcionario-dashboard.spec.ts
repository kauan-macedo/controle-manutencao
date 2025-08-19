import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioDashboard } from './funcionario-dashboard';

describe('FuncionarioDashboard', () => {
  let component: FuncionarioDashboard;
  let fixture: ComponentFixture<FuncionarioDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

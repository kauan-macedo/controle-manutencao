import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioCrudEquip } from './funcionario-crud-equip';

describe('FuncionarioCrudEquip', () => {
  let component: FuncionarioCrudEquip;
  let fixture: ComponentFixture<FuncionarioCrudEquip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioCrudEquip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioCrudEquip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteLayout } from './cliente-layout';

describe('ClienteLayout', () => {
  let component: ClienteLayout;
  let fixture: ComponentFixture<ClienteLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

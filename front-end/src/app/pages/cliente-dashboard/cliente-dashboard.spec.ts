import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDashboard } from './cliente-dashboard';

describe('ClienteDashboard', () => {
  let component: ClienteDashboard;
  let fixture: ComponentFixture<ClienteDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

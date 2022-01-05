import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtekEmployeePagiComponent } from './etek-employee-pagi.component';

describe('EtekEmployeePagiComponent', () => {
  let component: EtekEmployeePagiComponent;
  let fixture: ComponentFixture<EtekEmployeePagiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtekEmployeePagiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtekEmployeePagiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

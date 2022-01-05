import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtekEmployeeUpdateComponent } from './etek-employee-update.component';

describe('EtekEmployeeUpdateComponent', () => {
  let component: EtekEmployeeUpdateComponent;
  let fixture: ComponentFixture<EtekEmployeeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtekEmployeeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtekEmployeeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

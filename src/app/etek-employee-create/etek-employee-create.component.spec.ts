import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtekEmployeeCreateComponent } from './etek-employee-create.component';

describe('EtekEmployeeCreateComponent', () => {
  let component: EtekEmployeeCreateComponent;
  let fixture: ComponentFixture<EtekEmployeeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtekEmployeeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtekEmployeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtekEmployeeDeleteComponent } from './etek-employee-delete.component';

describe('EtekEmployeeDeleteComponent', () => {
  let component: EtekEmployeeDeleteComponent;
  let fixture: ComponentFixture<EtekEmployeeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtekEmployeeDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtekEmployeeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

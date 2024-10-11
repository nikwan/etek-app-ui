import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsignAuthComponentComponent } from './esign-auth-component.component';

describe('EsignAuthComponentComponent', () => {
  let component: EsignAuthComponentComponent;
  let fixture: ComponentFixture<EsignAuthComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsignAuthComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsignAuthComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

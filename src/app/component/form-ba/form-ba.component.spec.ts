import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBAComponent } from './form-ba.component';

describe('FormBAComponent', () => {
  let component: FormBAComponent;
  let fixture: ComponentFixture<FormBAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormBAComponent]
    });
    fixture = TestBed.createComponent(FormBAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

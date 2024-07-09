import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDAComponent } from './form-da.component';

describe('FormDAComponent', () => {
  let component: FormDAComponent;
  let fixture: ComponentFixture<FormDAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDAComponent]
    });
    fixture = TestBed.createComponent(FormDAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

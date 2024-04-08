import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryforempComponent } from './salaryforemp.component';

describe('SalaryforempComponent', () => {
  let component: SalaryforempComponent;
  let fixture: ComponentFixture<SalaryforempComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryforempComponent]
    });
    fixture = TestBed.createComponent(SalaryforempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

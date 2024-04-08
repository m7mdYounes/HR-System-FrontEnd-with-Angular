import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllsalariesComponent } from './allsalaries.component';

describe('AllsalariesComponent', () => {
  let component: AllsalariesComponent;
  let fixture: ComponentFixture<AllsalariesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllsalariesComponent]
    });
    fixture = TestBed.createComponent(AllsalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

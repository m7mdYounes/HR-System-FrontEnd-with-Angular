import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllAttendancePerMonthComponent } from './get-all-attendance-per-month.component';

describe('GetAllAttendancePerMonthComponent', () => {
  let component: GetAllAttendancePerMonthComponent;
  let fixture: ComponentFixture<GetAllAttendancePerMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAllAttendancePerMonthComponent]
    });
    fixture = TestBed.createComponent(GetAllAttendancePerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

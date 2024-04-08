import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllAttendanceForOneEmpComponent } from './get-all-attendance-for-one-emp.component';

describe('GetAllAttendanceForOneEmpComponent', () => {
  let component: GetAllAttendanceForOneEmpComponent;
  let fixture: ComponentFixture<GetAllAttendanceForOneEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAllAttendanceForOneEmpComponent]
    });
    fixture = TestBed.createComponent(GetAllAttendanceForOneEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

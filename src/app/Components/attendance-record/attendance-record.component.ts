import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ILog } from 'src/app/Models/ilog';
import { Recordform } from 'src/app/Models/recordform';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { RecordsService } from 'src/app/Services/records.service';

@Component({
  selector: 'app-attendance-record',
  templateUrl: './attendance-record.component.html',
  styleUrls: ['./attendance-record.component.css']
})
export class AttendanceRecordComponent implements OnInit{
  Record:Recordform={} as Recordform;
  logAPI:ILog = {} as ILog;
  empname : any[]= [];
  empname1 : any[]= [];
  recordsofday:any[] = [];
  constructor(private dynamicservice:RecordsService,private employeeservice:EmployeeServiceService){}

  attendanceRecordAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Records") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
}

    ngOnInit(): void {
      this.employeeservice.GetAllEmployee().subscribe(e=>this.empname1=e);
      this.dynamicservice.getempnames().subscribe(e=>this.empname = e);
  
    }
  AddRecord(){
  this.logAPI.emp_name = String(this.Record.emp_name);
  this.logAPI.day_date = String(this.Record.daydate);
  this.logAPI.attendance_time = String(this.Record.arrival);
  this.logAPI.departure_time = String(this.Record.dissmissal);
  console.log(this.logAPI);
  this.dynamicservice.recordattendance(this.logAPI).subscribe(
    () => {
      this.dynamicservice.getrecordbydate("hhhh").subscribe(e=>this.recordsofday = e);
      alert('Log successfully!');
      window.location.reload();

    },
    (error) => {
      console.error('Error enter new log:', error);
      if (error instanceof HttpErrorResponse && error.error && error.error.errors) {
        const errorMessage = error.error.errors[Object.keys(error.error.errors)[0]];
        alert('Failed to enter new log:\n' + errorMessage);
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  );
  this.dynamicservice.getrecordbydate("hhhh").subscribe(e=>this.recordsofday = e);
  
  }
  }

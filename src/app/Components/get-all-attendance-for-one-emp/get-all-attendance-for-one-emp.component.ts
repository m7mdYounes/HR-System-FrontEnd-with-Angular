import { Component, OnInit } from '@angular/core';
import { ILog } from 'src/app/Models/ilog';
import { RecordsService } from 'src/app/Services/records.service';

@Component({
  selector: 'app-get-all-attendance-for-one-emp',
  templateUrl: './get-all-attendance-for-one-emp.component.html',
  styleUrls: ['./get-all-attendance-for-one-emp.component.css']
})
export class GetAllAttendanceForOneEmpComponent {
  attendanceRecords: ILog[] = [];
  reqSalary = {
    month:0,
    year:0
  }
  constructor(private recordService: RecordsService) { }


  loadData() {
    this.recordService.GetAttendforEmpbyname(this.reqSalary.year,this.reqSalary.month).subscribe(
      (records: ILog[]) => {
      this.attendanceRecords = records;
    });
  }
 getProfileRecordsAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "View") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
}
  onSubmit() {
    this.loadData();
  }
}

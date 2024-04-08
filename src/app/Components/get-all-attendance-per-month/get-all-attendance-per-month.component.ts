import { Component, OnInit } from '@angular/core';
import { ILog } from 'src/app/Models/ilog';
import { RecordsService } from 'src/app/Services/records.service';

@Component({
  selector: 'app-get-all-attendance-per-month',
  templateUrl: './get-all-attendance-per-month.component.html',
  styleUrls: ['./get-all-attendance-per-month.component.css']
})
export class GetAllAttendancePerMonthComponent  {
  allAttendanceRecords: ILog[] = [];
  reqSalary = {
    month:0,
    year:0
  }
  constructor(private recordService: RecordsService) { }

  getRecordsByMonthAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" ||cc.trim() === "Records") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
}
  loadData() {
    this.recordService.GetAllAttendforMonthYear(this.reqSalary.year,this.reqSalary.month).subscribe((records: ILog[]) => {
      this.allAttendanceRecords = records;
    });
  }

  onSubmit() {
    this.loadData();
  }
}
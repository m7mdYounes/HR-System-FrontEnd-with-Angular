import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ILog } from 'src/app/Models/ilog';
import { Recordform } from 'src/app/Models/recordform';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { RecordsService } from 'src/app/Services/records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit{
  recordsofday:any[] = [];
  constructor(private dynamicservice:RecordsService){}

  getAllRecordAuth(): boolean {
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
  this.loadData();
  }

  loadData(){
    this.dynamicservice.getrecordbydate("hhhh").subscribe(e=>this.recordsofday = e);
  }

  deleterecord(id:number){
    if (!id) {
      console.error('No record selected for deletion');
      return;
    }
  
    const isConfirmed = confirm("Are you sure you want to delete this record");
    if(isConfirmed){
      this.dynamicservice.deleterecord(id).subscribe(
        () => {
          this.loadData();
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting record:', error);
  
          if (error.error) {
            console.error('Server response:', error.error);
          }
  
          alert('Failed to delete the record. Please try again.');
        }
      );
    }
  }
}

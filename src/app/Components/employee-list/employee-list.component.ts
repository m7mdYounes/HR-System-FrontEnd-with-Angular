import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IreadEmployee } from 'src/app/Models/iread-employee';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  EmployeeList:IreadEmployee[] = [];
 
  constructor(private empData:EmployeeServiceService ) {
    
    console.log(this.EmployeeList)
  }

  getAllEmployeesAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Employee") { // Added 'trim()' to remove extra spaces
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
    this.empData.GetAllEmployee().subscribe(i=>this.EmployeeList = i );
  }
  delete(id:number){
    if (!id) {
      console.error('No record selected for deletion');
      return;
    }
  
    const isConfirmed = confirm("Are you sure you want to delete this employee");
    if(isConfirmed){
      this.empData.deleteEmployee(id).subscribe(
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
      window.location.reload();
    }
    
  }
}


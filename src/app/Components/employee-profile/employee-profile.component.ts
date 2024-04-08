import { Component, OnInit } from '@angular/core';
import { IreadEmployee } from 'src/app/Models/iread-employee';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  employeeData: IreadEmployee = {} as IreadEmployee;
  constructor(private empservice:EmployeeServiceService) {  }
  ngOnInit(): void {
    const userName = localStorage.getItem('NAME');
    if (userName) {
      this.empservice.GetByUserName(userName).subscribe(u => this.employeeData = u);
    } else {
      console.error('User name not found in local storage');
    }
  }

getEmpProfileAuth(): boolean {
  const roles = localStorage.getItem("ROLES")?.split(",");
  if (roles) {
      for (let cc of roles) { // Changed from 'in' to 'of'
          if (cc.trim() === "View" ) { // Added 'trim()' to remove extra spaces
              return true;
          }
      }
  }
  return false;
}
}

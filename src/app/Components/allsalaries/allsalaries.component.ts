import { Component } from '@angular/core';
import { SalaryService } from 'src/app/Services/salary.service';

@Component({
  selector: 'app-allsalaries',
  templateUrl: './allsalaries.component.html',
  styleUrls: ['./allsalaries.component.css']
})
export class AllsalariesComponent {
reqSalary = {
  month:0,
  year:0
};
salaries:any[] =[];
constructor(private ser:SalaryService) {}

getAllSalariesAuth(): boolean {
  const roles = localStorage.getItem("ROLES")?.split(",");
  if (roles) {
      for (let cc of roles) { 
          if (cc.trim() === "Admin" ||cc.trim() === "Salary") { 
              return true;
          }
      }
  }
  return false;
}
submit(){
  this.salaries = [];
this.ser.getallsalaries(this.reqSalary.year,this.reqSalary.month).subscribe(
    (response)=>{
      this.salaries = response;
    },
    (error)=>{
      alert(error.message)
    }
)
}
}

  
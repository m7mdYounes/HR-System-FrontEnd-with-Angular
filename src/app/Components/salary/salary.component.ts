import { Component, OnInit } from '@angular/core';
import { IgetSalary } from 'src/app/Models/iget-salary';
import { IsendreqSalary } from 'src/app/Models/isendreq-salary';
import { SalaryService } from 'src/app/Services/salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  emplist:any = [];
  salaryreport:IgetSalary ={} as IgetSalary;
  reqSalary:IsendreqSalary ={} as IsendreqSalary;
  constructor(private salaryservice:SalaryService){}

  calcSalaryForEmpAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Salary") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
  }
  ngOnInit(): void {
    this.salaryservice.getallemployees().subscribe(e=>this.emplist =e);
  }
  
  submitform(){
    this.salaryservice.getsalaryforemployee(Number(this.reqSalary.id),Number(this.reqSalary.year),Number(this.reqSalary.month)).subscribe(e=>this.salaryreport = e);
  }
}
  
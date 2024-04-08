import { Component } from '@angular/core';
import { SalaryService } from 'src/app/Services/salary.service';

@Component({
  selector: 'app-salaryforemp',
  templateUrl: './salaryforemp.component.html',
  styleUrls: ['./salaryforemp.component.css']
})
export class SalaryforempComponent {
    reqSalary = {
      month:0,
      year:0
    }
    salaryreport:any = {} ;
    constructor(private ser:SalaryService){}
    getEmpSalaryAuth(): boolean {
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
    submit(){
  this.salaryreport = {};
  this.ser.getsalarybyname(this.reqSalary.year,this.reqSalary.month).subscribe(
    (response)=>{
      this.salaryreport = response;
    },
    (error)=>{
      alert(error);
    }
  )

    }
  }

import { HttpErrorResponse } from '@angular/common/http';
import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-custom-auth',
  templateUrl: './custom-auth.component.html',
  styleUrls: ['./custom-auth.component.css'],

})
export class CustomAuthComponent {
  authForm = {
    roleName : "",
    roles : [""]
  }
    employee:boolean = false;
    salary:boolean = false;
    holiday:boolean = false;
    settings:boolean = false;
    records:boolean = false;
  constructor(private auth:AuthServiceService){}
  AddAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
}

  submit(){
    if (this.employee) {
      this.authForm.roles.push('Employee');
    }
    if (this.holiday) {
      this.authForm.roles.push('Holiday');
    }
    if (this.settings) {
      this.authForm.roles.push('Settings');
    }
    if (this.salary) {
      this.authForm.roles.push('Salary');
    }
    if (this.records) {
      this.authForm.roles.push('Records');
    }

    this.authForm.roles.splice(0,1);

    this.auth.setnewrole(this.authForm).subscribe(
      () => {
        confirm('Auth added successfully!');
        this.resetForm();
      },
      (error) => {
        alert("Role Already Been set");
      }
    );
  }
errors:string = "";
  resetForm() {
    this.authForm = {
      roleName: "",
      roles: [""]
    }
    this.employee = false;
    this.salary = false;
    this.holiday = false;
    this.settings = false;
    this.records = false;
  }
}

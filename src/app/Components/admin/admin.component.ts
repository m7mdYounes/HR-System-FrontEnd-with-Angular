import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admin = {
    name:"",
    password:"",
    role:""
  }
  roles:string[]= [];
  constructor(private adm:AdminService){}
  ngOnInit(): void {
    this.adm.getroles().subscribe(a=>this.roles = a);
  }
  AddAdminAuth(): boolean {
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

    const nameRegex = /^[a-zA-Z0-9]*$/;

    // if (!nameRegex.test(this.admin.name)) {
    //   alert('Name can only contain letters and numbers.');
    //   return;
    // }
    this.adm.addnewadmin(this.admin).subscribe(
      (response)=>{
        console.log(response);
        confirm('Success');
        this.admin = {
          name:"",
          password:"",
          role:""
        }
        
      },
      (error)=>{
        console.error(error);
        alert(error.error.text);
        this.admin = {
          name:"",
          password:"",
          role:""
        }
      }
    )
  }
  adminauth():boolean{
    if(localStorage.getItem("Roles") == "Admin"){
      return true;
    }
    else{
      return false;
    }
  }

}

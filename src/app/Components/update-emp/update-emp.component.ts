import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/Models/iemployee';
import { IreadEmployee } from 'src/app/Models/iread-employee';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';

@Component({
  selector: 'app-update-emp',
  templateUrl: './update-emp.component.html',
  styleUrls: ['./update-emp.component.css']
})
export class UpdateEmpComponent implements OnInit {
  employeeForm: FormGroup = {} as FormGroup;
  employee: IreadEmployee = {} as IreadEmployee;
  id: number = 0;

  constructor(private activerouter:ActivatedRoute , private empservice:EmployeeServiceService, private fb:FormBuilder,private router:Router) {
    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.ageValidator]],
      nationalIdNumber: ['', [Validators.required, Validators.pattern('^[0-9]{14}$')]],
      contractDate: ['', Validators.required],
      salary: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
    console.log(this.employee)
  }

  editEmployeeAuth(): boolean {
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
    this.id = Number(this.activerouter.snapshot.paramMap.get("id"));
    this.empservice.GetById(this.id).subscribe(e => {
      this.employee = e;
      this.initForm();
    });
   
  }
  initForm() {
    this.employeeForm = this.fb.group({
      fullName: [this.employee.fullName, Validators.required],
      address: [this.employee.address, Validators.required],
      phoneNumber: [this.employee.phoneNumber, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      gender: [this.employee.gender, Validators.required],
      nationality: [this.employee.nationality, Validators.required],
      dateOfBirth: [this.employee.dateOfBirth, [Validators.required, this.ageValidator]],
      nationalIdNumber: [this.employee.nationalIdNumber, [Validators.required, Validators.pattern('^[0-9]{14}$')]],
      contractDate: [this.employee.contractDate,[ Validators.required,this.contractDateValidator]],
      salary: [this.employee.salary, Validators.required],
      startTime: [this.employee.startTime, Validators.required],
      endTime: [this.employee.endTime, Validators.required]
    });
  }
  get fullName() {
    return this.employeeForm.get('fullName')
  }
  get address() {
    return this.employeeForm.get('address')
  } 
  get phoneNumber() {
    return this.employeeForm.get('phoneNumber')
  }
  get gender() {
    return this.employeeForm.get('gender')
  }
  get nationality() {
    return this.employeeForm.get('nationality')
  }
  get contractDate() {
    return this.employeeForm.get('contractDate')
  }
  get salary() {
    return this.employeeForm.get('salary')
  }
  get startTime() {
    return this.employeeForm.get('startTime')
  }
  get endTime() {
    return this.employeeForm.get('endTime')
  }
  get dateOfBirth(){
    return this.employeeForm.get('dateOfBirth')
  }
  get nationalIdNumber(){
    return this.employeeForm.get('nationalIdNumber')
  }

  contractDateValidator(control: { value: string | number | Date; }) {
    const contractDate = new Date(control.value);
    const companyStartDate = new Date('2023-01-01');
  
    if (contractDate < companyStartDate) {
      return { invalidContractDate: true };
    }
    return null;
  }

  ageValidator(control: { value: string | number | Date; }) {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 20) {
      return { InvalidAge: true };
    }
    return null;
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData: IEmployee = this.employeeForm.value;
      console.log(employeeData);
      this.empservice.UpdateEmployee(this.id,employeeData).subscribe(
        (response) => {
          console.log('Employee Ubdated successfully:', response);
        },
        (error) => {
          console.error('Error Updating employee:', error);
        }
      );;
    }
    this.router.navigate(['/AllEmployee']);
  }
 
  

  
}

import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/Models/iemployee';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { passwordMatched } from '../Validations/crossfieldvalidation';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  userform:FormGroup;
  companyEstablishmentDate: Date = new Date('2020-01-01');
  constructor(private fb:FormBuilder,private DataEmp:EmployeeServiceService ,private router:Router) {
    this.userform = this.fb.group({
      fullName:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9]+$')]],
      address:['',Validators.required],
      phoneNumber:['',[Validators.required,Validators.pattern('[0-9]{11}')]],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.ageValidator]],
      nationalIdNumber: ['',[Validators.required,Validators.pattern('[0-9]{14}')]],
      contractDate: ['',[ Validators.required,this.contractDateValidator]],
      salary: ['', [Validators.required,Validators.pattern('[0-9]{2,}')]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      pass:["",Validators.required],
      cpass:["",Validators.required],
    },{validator: passwordMatched()});
  }
  get fullName() {
    return this.userform.get('fullName')
  }
  get address() {
    return this.userform.get('address')
  }
  get phoneNumber() {
    return this.userform.get('phoneNumber')
  }
  get gender() {
    return this.userform.get('gender')
  }
  get nationality() {
    return this.userform.get('nationality')
  }
  get contractDate() {
    return this.userform.get('contractDate')
  }
  get salary() {
    return this.userform.get('salary')
  }
  get startTime() {
    return this.userform.get('startTime')
  }
  get endTime() {
    return this.userform.get('endTime')
  }
  get dateOfBirth(){
    return this.userform.get('dateOfBirth')
  }
  get nationalIdNumber(){
    return this.userform.get('nationalIdNumber')
  }
  get pass(){
    return this.userform.get('pass')
  }
  get cpass(){
    return this.userform.get('cpass')
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
    let UserModel:IEmployee = <IEmployee>this.userform.value;
    console.log(UserModel);
    this.DataEmp.AddEmp(UserModel).subscribe(
      (response) => {
        console.log('Employee added successfully:', response);
      },
      (error) => {
        console.error('Error adding employee:', error);
      }
    );;

    this.router.navigate(['/employees'])
    }

}
// function Contractdatevalidation(companyEstablishmentDate: Date): any {
//   throw new Error('Function not implemented.');
//}


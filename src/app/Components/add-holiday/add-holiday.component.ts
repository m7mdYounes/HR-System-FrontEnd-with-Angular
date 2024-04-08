import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRecord } from 'src/app/Models/irecord';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.css']
})
export class AddHolidayComponent {
  frecords:IRecord[]=[];
  selectedRecord?: IRecord ;
  faddHoliday!:FormGroup;
  Record:IRecord= {} as IRecord;

  constructor(private dataService: DataService, private fb: FormBuilder,private router: Router,private el: ElementRef,private renderer: Renderer2) {
    this.faddHoliday = this.fb.group({
      id:[null],
      name: [null, Validators.required],
      date: [null, Validators.required]
    });
    
  }
  AddHolidayAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Holiday") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
}
  
  onSubmit(): void {
    if (this.faddHoliday.valid) {
      const nameControl = this.faddHoliday.get('name');
      const dateControl = this.faddHoliday.get('date');
  
      if (nameControl && dateControl) {
        const name = String(nameControl.value);
        const date = String(dateControl.value);
  
        if (this.dataService.isHolidayAlreadyExists(name, date)) {
          console.log('Holiday already exists. Do not add.');
        } else {
          const newRecord: IRecord = { id: '0', name, date }; 
  
          this.dataService.fpostData(newRecord).subscribe(
            () => {
              this.faddHoliday.reset();
              alert('Holiday added successfully!');
            },
            (error) => {
              console.error('Error adding new record:', error);
              if (error instanceof HttpErrorResponse && error.error && error.error.errors) {
                const errorMessage = error.error.errors[Object.keys(error.error.errors)[0]];
                alert('Failed to add the holiday:\n' + errorMessage);
              } else {
                alert('An unexpected error occurred. Please try again later.');
              }
            }
          );
        }
      } else {
        console.error('One or more form controls are null.');
      }
    }
  }
  
}



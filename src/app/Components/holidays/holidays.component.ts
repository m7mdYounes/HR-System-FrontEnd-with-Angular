import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRecord } from 'src/app/Models/irecord';
import { DataService } from 'src/app/Services/data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent {
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

  ngOnInit(): void {
    this.loadData();
    console.log('Initial Selected Record:', this.selectedRecord);

  }

  loadData(): void {
    this.dataService.getData().subscribe(p=>this.frecords = p);
  }
  editRecord(record: IRecord): void {
    console.log('Selected Record:', record);
    this.router.navigate(['editholiday', record.id]);
  }

  getAllHolidayAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Holiday" || cc.trim() === "View") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
}

editOrDeleteHolidayAuth(): boolean {
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

  deleteRecord(record: IRecord): void {
    if (!record) {
      console.error('No record selected for deletion');
      return;
    }
  
    const isConfirmed = confirm(`Are you sure you want to delete ${record.name}?`);
    if (isConfirmed) {
      this.dataService.deleteData(parseInt(record.id)).subscribe(
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
    }
  }
  
}



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecord } from 'src/app/Models/irecord';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-edit-holiday',
  templateUrl: './edit-holiday.component.html',
  styleUrls: ['./edit-holiday.component.css']
})
export class EditHolidayComponent implements OnInit {
  editForm!: FormGroup;
  recordId: number= 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}
  
  editHolidayAuth(): boolean {
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

  ngOnInit(): void {
    // Initialize the form and retrieve the record ID from the route parameters
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: [null, Validators.required]
    });

    this.route.params.subscribe(params => {
      this.recordId = +params['id']; // Convert the id parameter to a number
      this.loadRecord();
    });
  }

  loadRecord(): void {
    // Fetch the record from the API using the recordId
    this.dataService.getRecordById(this.recordId).subscribe(
      (record: IRecord) => {
        // Populate the form fields with the fetched record data
        this.editForm.patchValue({
          name: record.name,
          date: record.date
        });
      },
      error => {
        console.error('Error loading record:', error);
      }
    );
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      const updatedRecord: IRecord = {
        id: String(this.recordId),
        name: this.editForm.value.name,
        date: this.editForm.value.date
      };

      // Call the edit service to update the record
      this.dataService.editData(this.recordId, updatedRecord).subscribe(
        () => {
          // Redirect to the list of holidays after successful edit
          this.router.navigate(['/holiday']);
        },
        error => {
          console.error('Error updating record:', error);
        }
      );
    }
  }
  goBack(): void {
    this.router.navigate(['/holiday']);
  }
}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HolidaysComponent } from './Components/holidays/holidays.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditHolidayComponent } from './Components/edit-holiday/edit-holiday.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { RecordsComponent } from './Components/records/records.component';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { UpdateEmpComponent } from './Components/update-emp/update-emp.component';
import { HomeComponent } from './Components/home/home.component';
import { SalaryComponent } from './Components/salary/salary.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminComponent } from './Components/admin/admin.component';
import { CustomAuthComponent } from './Components/custom-auth/custom-auth.component';
import { AddHolidayComponent } from './Components/add-holiday/add-holiday.component';
import { AttendanceRecordComponent } from './Components/attendance-record/attendance-record.component';
import { RouterModule } from '@angular/router';
import { SalaryforempComponent } from './Components/salaryforemp/salaryforemp.component';
import { AllsalariesComponent } from './Components/allsalaries/allsalaries.component';
import { GetAllAttendancePerMonthComponent } from './Components/get-all-attendance-per-month/get-all-attendance-per-month.component';
import { GetAllAttendanceForOneEmpComponent } from './Components/get-all-attendance-for-one-emp/get-all-attendance-for-one-emp.component';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { EmployeeProfileComponent } from './Components/employee-profile/employee-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    AttendanceRecordComponent,
    HolidaysComponent,
    EditHolidayComponent,
    SettingsComponent,
    RecordsComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    UpdateEmpComponent,
    HomeComponent,
    SalaryComponent,
    LoginComponent,
    AdminComponent,
    CustomAuthComponent,
    AddHolidayComponent,
    SalaryforempComponent,
    AllsalariesComponent,
    GetAllAttendancePerMonthComponent,
    GetAllAttendanceForOneEmpComponent,
    EmployeeProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [DatePipe,
   {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

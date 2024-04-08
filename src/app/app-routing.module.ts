import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidaysComponent } from './Components/holidays/holidays.component';
import { EditHolidayComponent } from './Components/edit-holiday/edit-holiday.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { RecordsComponent } from './Components/records/records.component';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { UpdateEmpComponent } from './Components/update-emp/update-emp.component';
import { LoginComponent } from './Components/login/login.component';
import { CustomAuthComponent } from './Components/custom-auth/custom-auth.component';
import { AdminComponent } from './Components/admin/admin.component';
import { loginauthGuard } from './Services/loginauth.guard';
import { SalaryComponent } from './Components/salary/salary.component';
import { AddHolidayComponent } from './Components/add-holiday/add-holiday.component';
import { AttendanceRecordComponent } from './Components/attendance-record/attendance-record.component';
import { SalaryforempComponent } from './Components/salaryforemp/salaryforemp.component';
import { AllsalariesComponent } from './Components/allsalaries/allsalaries.component';
import { GetAllAttendancePerMonthComponent } from './Components/get-all-attendance-per-month/get-all-attendance-per-month.component';
import { GetAllAttendanceForOneEmpComponent } from './Components/get-all-attendance-for-one-emp/get-all-attendance-for-one-emp.component';
import { EmployeeProfileComponent } from './Components/employee-profile/employee-profile.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'login',  component:LoginComponent },
  { path: 'home',component:HomeComponent,canActivate : [loginauthGuard]},
  { path: 'holiday',component:HolidaysComponent,canActivate : [loginauthGuard]},
  { path: 'addholiday',component:AddHolidayComponent,canActivate : [loginauthGuard]},
  { path: 'editholiday/:id', component: EditHolidayComponent ,canActivate : [loginauthGuard]},
  { path: 'settings', component: SettingsComponent,canActivate : [loginauthGuard]},
  { path: 'records', component: RecordsComponent ,canActivate : [loginauthGuard]},
  { path: 'attendance', component: AttendanceRecordComponent ,canActivate : [loginauthGuard]},
  { path: 'Addemp', component: EmployeeFormComponent ,canActivate : [loginauthGuard]},
  { path: 'employees', component: EmployeeListComponent ,canActivate : [loginauthGuard]},
  { path: 'editemp/:id', component: UpdateEmpComponent ,canActivate : [loginauthGuard]},
  { path: 'employeeProfile', component: EmployeeProfileComponent ,canActivate : [loginauthGuard]},
  { path:  'authorize' , component:CustomAuthComponent,canActivate : [loginauthGuard]},
  { path : 'admin' , component:AdminComponent,canActivate : [loginauthGuard]},
  { path : 'salary', component:SalaryComponent,canActivate : [loginauthGuard]},
  { path : 'empsalary', component:SalaryforempComponent,canActivate : [loginauthGuard]},
  { path : 'allsalaries', component:AllsalariesComponent,canActivate : [loginauthGuard]},
  { path : 'attendbymonth', component:GetAllAttendancePerMonthComponent,canActivate : [loginauthGuard]},
  { path : 'attendbyname', component:GetAllAttendanceForOneEmpComponent,canActivate : [loginauthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

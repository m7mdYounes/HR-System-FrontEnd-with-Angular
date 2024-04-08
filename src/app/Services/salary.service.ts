import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService{
  url:string =  "http://localhost:5291/api/Salary/"

  constructor(private httpclient:HttpClient) { }

  getallemployees():Observable<any>{
    return this.httpclient.get(this.url);
  }
  getsalaryforemployee(empid:number,year:number,month:number):Observable<any>{
    return this.httpclient.get(this.url+empid+"/"+year+"/"+month);
  }
  getallsalaries(year:number,month:number):Observable<any>{
    return this.httpclient.get(this.url+year+"/"+month);
  }
  getsalarybyname(year:number,month:number):Observable<any>{
    return this.httpclient.get(this.url+localStorage.getItem("NAME")+"/"+year+"/"+month);
  }
}


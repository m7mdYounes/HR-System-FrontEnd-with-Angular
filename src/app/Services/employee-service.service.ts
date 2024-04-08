import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../Models/iemployee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeServiceService {

  url:string ="http://localhost:5291/api/NewEmployee"
  constructor(private httpclient:HttpClient) {}
  GetAllEmployee():Observable<any>{
    return this.httpclient.get(this.url);
   }
   GetById(id:number):Observable<any>{

    return this.httpclient.get(this.url+"/"+id);
   }
   AddEmp(Emp:IEmployee):Observable<any>{
    console.log(Emp)
    return this.httpclient.post(this.url,Emp);
   }
   UpdateEmployee(id:number,Emp:IEmployee):Observable<any>{
    return this.httpclient.put(this.url+"/"+id,Emp)
   }
   deleteEmployee(id:number):Observable<any>{
    return this.httpclient.delete(this.url+"/"+id)
   }
   CheckNationalId(nationalId: string): Observable<any> {
    return this.httpclient.post(`${this.url}/CheckNationalId`, { nationalId });
  }
  GetByUserName(userName:string):Observable<any>{

    return this.httpclient.get(this.url+"/"+userName);
   }
}

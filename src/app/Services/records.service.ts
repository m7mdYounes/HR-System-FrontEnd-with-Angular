import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILog } from '../Models/ilog';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  url:string =  "http://localhost:5291/api/LogRecord/"
    constructor(private httpclient:HttpClient) {}
     getempnames():Observable<any>{
      return this.httpclient.get(this.url);
     }
     getrecordbydate(date:string):Observable<any>{
      return this.httpclient.get(this.url+date);
     }
     getrecordbyid(id:number):Observable<any>{
      return this.httpclient.get(this.url+id);
     }


     recordattendance(log:ILog):Observable<any>{
      return this.httpclient.post(this.url,log);
     }

     deleterecord(id:number):Observable<any>{
      return this.httpclient.delete(this.url+id,{})
     }

     GetAllAttendforMonthYear(year:number,month:number):Observable<any>{
      return this.httpclient.get(this.url+year+"/"+month);
    }
    GetAttendforEmpbyname(year:number,month:number):Observable<any>{
      return this.httpclient.get(this.url+localStorage.getItem("NAME")+"/"+year+"/"+month);
    }



  }
  // http://localhost:5165/api/LogRecord

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url:string = "http://localhost:5291/api/Admin/";
  constructor(private http:HttpClient) { }

  getroles():Observable<any>{
    return this.http.get(this.url);
  }
  addnewadmin(admin:{}):Observable<any>{
    return this.http.post(this.url,admin);
  }
}

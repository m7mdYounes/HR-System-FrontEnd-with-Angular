import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecord } from '../Models/irecord';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl:string = 'http://localhost:5291/api/holidays';
  frecords: IRecord[] = [];
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  fpostData(record: IRecord): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<IRecord>(this.apiUrl, JSON.stringify(record), { headers });
  }

  editData(id: number, updatedData: IRecord): Observable<any> {
    const editUrl = `${this.apiUrl}/${id}`;
    return this.http.put(editUrl, updatedData);
  }
  deleteData(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete(deleteUrl);
  }
  getRecordById(id: number): Observable<IRecord> {
    const getUrl = `${this.apiUrl}/${id}`;
    return this.http.get<IRecord>(getUrl);
  }

  isHolidayAlreadyExists(name: string, date: string): boolean {
    return this.frecords.some((holiday) => holiday.name === name && holiday.date === date);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISettings } from '../Models/isettings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  apiUrl:string = 'http://localhost:5291/api/settings';

  constructor(private http: HttpClient) {}

  getAllSettings(): Observable<ISettings[]> {
    return this.http.get<ISettings[]>(this.apiUrl);
  }

  getSettingsById(id: number): Observable<ISettings> {
    return this.http.get<ISettings>(`${this.apiUrl}/${id}`);
  }

  addSettings(settings: ISettings): Observable<ISettings> {
    console.log(settings);
    return this.http.post<ISettings>(this.apiUrl, settings);
  }

  updateSettings(id: number, settings:ISettings): Observable<ISettings> {
    return this.http.put<ISettings>(`${this.apiUrl}/${id}`, settings);
  }

  deleteSettings(id: number): Observable<ISettings> {
    return this.http.delete<ISettings>(`${this.apiUrl}/${id}`);
  }
}

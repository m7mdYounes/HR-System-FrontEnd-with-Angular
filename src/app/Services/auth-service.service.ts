import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 url:string = "http://localhost:5291/api/Account";
  constructor(private http:HttpClient,private route:Router) { }

  login(username:string,password:string):Observable<any>{
    return this.http.get(this.url+"/"+username+"/"+password);
  }
  signout(){
    localStorage.removeItem("TOKEN");
    this.route.navigate(['/']);
  }
  setnewrole(role: {}): Observable<any> {
    return this.http.post(this.url, role).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = error.error;
        }
        return throwError(errorMessage);
      })
    );
  }
}
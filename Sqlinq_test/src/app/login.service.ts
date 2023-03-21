import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response } from './response';
@Injectable({
  providedIn: 'root'
})
export class loginService {
  private apiUrl = 'https://localhost:7231/user/login';
  private tokenKey = 'token';
  myResponse!: Response;
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Response> {
    const body = { email, password };
    return this.http.post<any>(this.apiUrl, body).pipe(
      tap(response => {
          const token = response.token;
          this.myResponse=response;
          console.log("myResponse",this.myResponse);
          localStorage.setItem(this.tokenKey, token);
      })
    );
  }

  // logout(): void {
  //   localStorage.removeItem(this.tokenKey);
  // }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) as string;
  }

  // isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }
}

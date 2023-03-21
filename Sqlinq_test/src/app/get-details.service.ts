import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResponseDetails } from './response-details';


@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {

  constructor(private http: HttpClient) { }

  getDetails(apiUrl: string, token: string): Observable<ResponseDetails[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(apiUrl, { headers }).pipe(
      map(response => response.map((item: any) => {
        const details: ResponseDetails = {
          projectId: item.projectId,
          name: item.name,
          score: item.score,
          durationInDays : item.durationInDays,
          bugsCount : item.bugsCount,
          madeDadeline : item.madeDadeline,
          idUser:item.idUser,
        };
        return details;
      })),
      catchError( error => {
        return throwError( 'Something went wrong!' )
      })
    );
  }
}

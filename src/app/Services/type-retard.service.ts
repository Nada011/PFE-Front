import { TypeRetard } from '../Entities/type-retard';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypeRetardService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  //get
  public getAllTypeRetards(): Observable<TypeRetard[]> {
    return this.http.get<TypeRetard[]>(
      `${this.apiServerUrl}/Admin/typeRetards`
    );
  }
  //Post
  public createTypeRetard(TypeRetard: TypeRetard): Observable<TypeRetard> {
    return this.http.post<TypeRetard>(
      `${this.apiServerUrl}/Admin/typeRetard/add`,
      TypeRetard
    );
  }
  //Put
  public updateTypeRetard(TypeRetard: TypeRetard): Observable<TypeRetard> {
    return this.http.put<TypeRetard>(
      `${this.apiServerUrl}/Admin/typeRetard/update`,
      TypeRetard
    );
  }
  //Delete
  public deleteTypeRetard(TypeRetardId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/Admin/typeRetard/delete/${TypeRetardId}`
    );
  }
}

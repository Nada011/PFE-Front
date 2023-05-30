import { Injectable } from '@angular/core';
import { Role } from '../Entities/role';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  //get
  public getAllRole(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiServerUrl}/Role`);
  }
  //Post
  public createRole(Role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiServerUrl}/Role/add`, Role);
  }
  //Put
  public updateRole(Role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiServerUrl}/Role/update`, Role);
  }
  //Delete
  public deleteRole(Role: String): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Role/delete/${Role}`);
  }
}

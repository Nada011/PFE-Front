import { authRequest } from './../authRequest/authRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Utilisateur } from 'src/app/Entities/utilisateur';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private http: HttpClient) {}

  public Authenticate(authRequest: authRequest): Observable<authRequest> {
    return this.http.post<authRequest>(
      `${this.apiServerUrl}/authenticate`,
      authRequest,
      { headers: this.requestHeader }
    );
  }

  public setRoles(roles: string) {
    window.localStorage.setItem('roles', roles);
  }
  public getRoles() {
    return localStorage.getItem('roles');
  }
  public setToken(jwtToken: string) {
    window.localStorage.setItem('jwtToken', jwtToken);
  }
  public getToken(): string {
    return localStorage.getItem('jwtToken')!;
  }
  public setUser(user: Utilisateur) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }
  public getUser(): Utilisateur {
    return JSON.parse(localStorage.getItem('user')!);
  }
  public clear() {
    localStorage.clear();
  }
  public roleMatch(allowedRole: string) {
    if (this.getRoles()?.match(allowedRole)) {
      return true;
    } else {
      return false;
    }
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}

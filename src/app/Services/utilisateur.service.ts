import { Utilisateur } from '../Entities/utilisateur';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiServerUrl}/Admin/users`);
  }
  public createUser(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(
      `${this.apiServerUrl}/Admin/user/add`,
      utilisateur
    );
  }
  public updateUsers(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(
      `${this.apiServerUrl}/Admin/user/update`,
      utilisateur
    );
  }
  public deleteUser(utilisateurId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/Admin/user/delete/${utilisateurId}`
    );
  }
}

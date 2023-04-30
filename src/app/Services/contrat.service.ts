import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contrat } from '../contrat/contrat';

@Injectable({
  providedIn: 'root',
})
export class ContratService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiServerUrl}/Admin/Contrats`);
  }
  public createContrat(Contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(
      `${this.apiServerUrl}/Admin/Contrat/add`,
      Contrat
    );
  }
  public updateContrat(Contrat: Contrat): Observable<Contrat> {
    return this.http.put<Contrat>(
      `${this.apiServerUrl}/Admin/Contrat/update`,
      Contrat
    );
  }
  public deleteContrat(ContratId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/Admin/Contrat/delete/${ContratId}`
    );
  }
}

import { Fournisseur } from '../fournisseur/fournisseur';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  //get
  public getAllFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(
      `${this.apiServerUrl}/Admin/fournisseurs`
    );
  }
  //Post
  public createFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(
      `${this.apiServerUrl}/Admin/fournisseur/add`,
      fournisseur
    );
  }
  //Put
  public updateFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(
      `${this.apiServerUrl}/Admin/fournisseur/update`,
      fournisseur
    );
  }
  //Delete
  public deleteFournisseur(fournisseurId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/Admin/fournisseur/delete/${fournisseurId}`
    );
  }
}

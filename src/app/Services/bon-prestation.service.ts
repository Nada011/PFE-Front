import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { BonPrestation } from '../Entities/bonPrestation';

@Injectable({
  providedIn: 'root',
})
export class BonPrestationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  public getAllBonPrestation(): Observable<BonPrestation[]> {
    return this.http.get<BonPrestation[]>(`${this.apiServerUrl}/BonPrestation`);
  }
  public createBonPrestation(
    BonPrestation: BonPrestation
  ): Observable<BonPrestation> {
    return this.http.post<BonPrestation>(
      `${this.apiServerUrl}/BonPrestation/add`,
      BonPrestation
    );
  }
  public updateBonPrestation(
    BonPrestation: BonPrestation
  ): Observable<BonPrestation> {
    return this.http.put<BonPrestation>(
      `${this.apiServerUrl}/BonPrestation/update`,
      BonPrestation
    );
  }
  public deleteBonPrestation(BonPrestationId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/BonPrestation/delete/${BonPrestationId}`
    );
  }
}

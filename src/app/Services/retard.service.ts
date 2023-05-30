import { addRetardRequest } from './../Entities/addRetardEntity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Retard } from '../Entities/retard';
import { Contrat } from '../contrat/contrat';

@Injectable({
  providedIn: 'root',
})
export class RetardService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  //get
  public getAllRetards(): Observable<Retard[]> {
    return this.http.get<Retard[]>(`${this.apiServerUrl}/Retard`);
  }
  //Post
  public createRetard(Retard: addRetardRequest): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/Retard/add`, Retard);
  }
}

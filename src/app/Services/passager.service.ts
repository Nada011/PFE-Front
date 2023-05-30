import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Passager } from '../Entities/passager';

@Injectable({
  providedIn: 'root',
})
export class PassagerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  //get
  public getAllPassagers(): Observable<Passager[]> {
    return this.http.get<Passager[]>(`${this.apiServerUrl}/Passager`);
  }
}

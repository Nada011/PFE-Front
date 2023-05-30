import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Vol } from '../Entities/vol';

@Injectable({
  providedIn: 'root',
})
export class VolService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  //get
  public getAllVols(): Observable<Vol[]> {
    return this.http.get<Vol[]>(`${this.apiServerUrl}/Vols`);
  }
}

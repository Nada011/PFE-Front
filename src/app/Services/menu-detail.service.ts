import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuDetail } from '../Entities/menuDetail';

@Injectable({
  providedIn: 'root',
})
export class MenuDetailService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  public getDetailMenu(MenuId: number): Observable<MenuDetail[]> {
    return this.http.get<MenuDetail[]>(
      `${this.apiServerUrl}/Admin/DetailMenu/${MenuId}`
    );
  }
  public createDetailMenu(MenuDetail: MenuDetail[]): Observable<MenuDetail[]> {
    return this.http.post<MenuDetail[]>(
      `${this.apiServerUrl}/Admin/DetailMenu/add`,
      MenuDetail
    );
  }
  public updateDetailMenu(MenuDetail: MenuDetail): Observable<MenuDetail> {
    return this.http.put<MenuDetail>(
      `${this.apiServerUrl}/Admin/DetailMenu/update`,
      MenuDetail
    );
  }
  public deleteDetailMenu(MenuDetailId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/Admin/DetailMenu/delete/${MenuDetailId}`
    );
  }
}

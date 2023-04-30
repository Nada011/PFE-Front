import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Menu } from '../Entities/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  //get
  public getAllMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiServerUrl}/Admin/Menu`);
  }
  //Post
  public createMenu(Menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${this.apiServerUrl}/Admin/Menu/add`, Menu);
  }
  //Put
  public updateMenu(Menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiServerUrl}/Admin/Menu/update`, Menu);
  }
  //Delete
  public deleteMenu(MenuId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/Admin/Menu/delete/${MenuId}`
    );
  }
}

import { Article } from '../Entities/article';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiServerUrl}/Admin/articles`);
  }
  public createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(
      `${this.apiServerUrl}/Admin/article/add`,
      article
    );
  }
  public updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(
      `${this.apiServerUrl}/Admin/article/update`,
      article
    );
  }
  public deleteArticle(articleId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/Admin/article/delete/${articleId}`
    );
  }
}

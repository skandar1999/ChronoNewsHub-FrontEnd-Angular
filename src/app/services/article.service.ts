import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Article } from '../models/Article.model';


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl: string = 'https://127.0.0.1:8000';

  constructor(private router: Router,
    private http : HttpClient) { }


    getAllArticles(): Observable<Article[]> {
      const url = `${this.baseUrl}/allArticles`;
      return this.http.get<Article[]>(url);
    }


    deleteArticle(id: number): Observable<any> {
      const url = `${this.baseUrl}/deleteArticle/${id}`;
      return this.http.delete(url, httpOptions);
    }


    addNewArticle(formData: FormData): Observable<any> {
      const url = `${this.baseUrl}/addnewpost`;
      return this.http.post<any>(url, formData);
    }


    getTechArticles(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/GetTechArticle`);
    }

    likeArticle(articleId: number): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/likes/${articleId}`, {});
    }

    DislikeArticle(articleId: number): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/Unlikes/${articleId}`, {});
    }

    getArticleById(productId: string): Observable<any> {
      const url = `${this.baseUrl}/getArticle/${productId}`; 
      return this.http.get(url);
    }


    getComments(articleId: number): Observable<{ article: { id: number }, comments: Comment[] }> {
      const url = `${this.baseUrl}/getComments/${articleId}`;
      return this.http.get<{ article: { id: number }, comments: Comment[] }>(url);
    }

    addComment(comment: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/addComment/${comment.articleId}`, comment);
    }
    

    getEconomicArticles(): Observable<Article[]> {
      const url = `${this.baseUrl}/GetEconomicArticle`;
      return this.http.get<Article[]>(url);
    }

    GetPoliticsArticles(): Observable<Article[]> {
      const url = `${this.baseUrl}/GetPoliticsArticle`;
      return this.http.get<Article[]>(url);
    }

    GetScientistsArticles(): Observable<Article[]> {
      const url = `${this.baseUrl}/GetScientistsArticle`;
      return this.http.get<Article[]>(url);
    }
}

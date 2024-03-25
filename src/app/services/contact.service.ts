import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Article } from '../models/Article.model';
import { Contact } from '../models/contact.model';


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl: string = 'https://127.0.0.1:8000';

  constructor(private router: Router,
    private http : HttpClient) { }




    contact(formData: FormData): Observable<any> {
      const url = `${this.baseUrl}/contactadmin`;
      return this.http.post<any>(url, formData);
    }

  
    getAllMessages(): Observable<any> {
      const url = `${this.baseUrl}/getallmessages`;
      return this.http.get<any>(url);
    }


    updateStatut(id: number): Observable<Contact> {
      const url = `${this.baseUrl}/updateStatut/${id}`;
      return this.http.put<Contact>(url, null);
    }

    DeleteMessage(id: number): Observable<any> {
      const url = `${this.baseUrl}/deleteMessage/${id}`;
      return this.http.delete(url, httpOptions);
    }


    

}

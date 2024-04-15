import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  public loggedUser!: string;

  users!: User[];
  baseUrl: string='https://127.0.0.1:8000';
  loginURL: string='https://127.0.0.1:8000/api/login_check';
  email!: string;

  token!: string;
  public isloggedIn: Boolean = false;


  constructor(
    private http: HttpClient,
    private router: Router,
    private helper: JwtHelperService,

  ) {}



  ngOnInit() {
    // Attach the event listener to 'storage' in ngOnInit
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage && event.key === 'jwt') {
        this.loadToken();
      }
    });
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    if (this.token) {
      this.isloggedIn = true;
      this.decodeJWT();
      this.email = localStorage.getItem('email')!; // Change 'username' to 'email'
    } else {
      this.isloggedIn = false;
    }
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt); 
    this.token = jwt;
    this.isloggedIn = true;
    localStorage.setItem('isloggedIn', 'true'); 
}

  

  decodeJWT(): void {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.email = decodedToken.sub;
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/userCreate`, user);
  }

  findUserByEmail(email: string): Observable<User> {
    const url = `${this.baseUrl}/findByEmail/${email}`;
    return this.http.get<User>(url);
  }
  

  login(user: User) {
    return this.http.post<any>(this.loginURL, user).pipe(
      tap((response) => {
        this.saveToken(response.jwt);
      })
    );
  }


  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token); // Store the token in local storage
  }

  getToken(): string {
    return this.token;
  }


  logout() {
    window.localStorage.clear();
    this.isloggedIn = false;
}


isUser(): Boolean {
  if (!this.isloggedIn)
    //this.roles== undefiened
    return false;
  return this.isloggedIn;
}


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'f9535b618bf6409f9cd01435242603'; 
  baseUrl = 'https://api.weatherapi.com/v1/current.json';

  constructor(private http: HttpClient) { }

  getWeatherData(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}?key=${this.apiKey}&q=${lat},${lon}`;
    return this.http.get<any>(url);
  }
}

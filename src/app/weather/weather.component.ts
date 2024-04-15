import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  latitude = 36.4512897; 
  longitude = 10.7355915; 

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getWeatherData(this.latitude, this.longitude)
      .subscribe(
        (data) => {
          this.weatherData = data;
          console.log('Weather Data:', this.weatherData);
        },
        (error) => {
          console.error('Error fetching weather:', error);
        }
      );
  }

  getWeatherIcon(iconCode: string): string {
    return `http:${iconCode}`;
  }
}

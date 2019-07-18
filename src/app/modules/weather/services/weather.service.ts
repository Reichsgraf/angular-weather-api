import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {
  apiKey = '&appid=e9e93af54962988557feeaec022fec6b';
  apiPath = 'http://api.openweathermap.org/data/2.5/';

  constructor(
    private http: HttpClient
  ) {}

  getWeatherByCity(city: string) {
    return this.http.get(this.apiPath + 'weather?q=' + city + this.apiKey);
  }
}

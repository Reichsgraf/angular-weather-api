import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../shared/models/weather.interface';

@Injectable()
export class WeatherService {
  apiKey = '&appid=e9e93af54962988557feeaec022fec6b';


  constructor(
    private http: HttpClient
  ) {}

  getWeatherByCity(city: string) {
    return this.http.get<Weather>('weather?q=' + city + this.apiKey);
  }

  getWeatherBy5Days(city: string) {
    return this.http.get('forecast?q=' + city + this.apiKey);
  }

  getWeatherBy16Days(city: string) {
    return this.http.get('forecast/daily?q=' + city + this.apiKey + '&cnt=16');
  }
}

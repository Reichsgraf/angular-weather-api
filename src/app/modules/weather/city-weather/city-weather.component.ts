import { Component, Input } from '@angular/core';

import { Weather } from '../shared/models/weather';

@Component({
  selector: 'city-weather',
  styleUrls: ['city-weather.component.scss'],
  templateUrl: 'city-weather.component.html'
})
export class CityWeatherComponent {
  @Input()
  weather: Weather;

  constructor() {}
}

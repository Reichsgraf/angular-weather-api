import {Component, Input} from '@angular/core';

import { Weather } from '../shared/models/weather.interface';

@Component({
  selector: 'current-weather',
  styleUrls: ['current-weather.component.scss'],
  templateUrl: 'current-weather.component.html'
})
export class CurrentWeatherComponent {
  @Input()
  city: string;

  @Input()
  weather: Array<Weather>;

  @Input()
  date: string;

  constructor() {}
}

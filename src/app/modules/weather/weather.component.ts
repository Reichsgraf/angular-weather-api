import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WeatherService } from './services/weather.service';
import { Weather } from './shared/models/weather';

@Component({
  selector: 'weather',
  styleUrls: ['weather.component.scss'],
  templateUrl: 'weather.component.html'
})
export class WeatherComponent implements OnInit {
  city: string;
  error = '';
  weather: Weather;
  form: FormGroup;

  @Output()
  submitted = new EventEmitter<FormGroup>();

  constructor(
    private weatherService: WeatherService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      city: ['', Validators.required]
    });
  }

  weatherByCity() {
    if (this.form.valid) {
      this.city = this.form.value['city'];
      this.weatherService.getWeatherByCity(this.city)
        .subscribe(
          next => {
            this.weather = new Weather(next);
            this.error = '';
          },
          error => {
            this.error = error.statusText;
          }
        );
    }
  }
}

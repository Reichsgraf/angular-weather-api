import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { WeatherService } from './services/weather.service';
import { Weather } from './shared/models/weather';
import { City } from './shared/models/city.interface';


@Component({
  selector: 'weather',
  styleUrls: ['weather.component.scss'],
  templateUrl: 'weather.component.html'
})
export class WeatherComponent implements OnInit {
  options: City[] = [
    { city: 'Hurzuf' }, { city: 'Holubynka' },
    { city: 'Laspi' }, { city: 'Alupka' },
    { city: 'Tyuzler' }, { city: 'Il’ichëvka' },
    { city: 'Partyzans’ke' }, { city: 'Bucha' },
    { city: 'Kiev' }, { city: 'Zaporizhzhya' }
  ];
  form: FormGroup;
  formControl = new FormControl();
  filteredOptions: Observable<City[]>;
  error = '';
  weather: Weather;

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
    this.filteredOptions = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(city => city ? this._filter(city) : this.options.slice())
      );
  }

  displayFn(city?: City): string | undefined {
    return city ? city.city : undefined;
  }

  private _filter(city: string): City[] {
    const filterValue = city.toLowerCase();

    return this.options.filter(option => option.city.toLowerCase().indexOf(filterValue) === 0);
  }

  weatherByCity(city: string) {
    return this.weatherService.getWeatherByCity(city)
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

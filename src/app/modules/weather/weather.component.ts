import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {WeatherService} from './services/weather.service';
import {Weather} from './shared/models/weather.interface';
import {City} from './shared/models/city.interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'weather',
  styleUrls: ['weather.component.scss'],
  templateUrl: 'weather.component.html'
})
export class WeatherComponent implements OnInit {
  cityOptions: City[] = [
    { city: 'Hurzuf' }, { city: 'Holubynka' },
    { city: 'Laspi' }, { city: 'Alupka' },
    { city: 'Tyuzler' }, { city: 'Il’ichëvka' },
    { city: 'Partyzans’ke' }, { city: 'Bucha' },
    { city: 'Kiev' }, { city: 'Zaporizhzhya' }
  ];

  form: FormGroup;
  cityFormControl = new FormControl();
  collectionFormControl = new FormControl();
  filteredCityOptions: Observable<City[]>;
  error = '';
  weather: Weather;
  forecast: Array<Weather>;

  @Output()
  submitted = new EventEmitter<FormGroup>();

  constructor(
    private weatherService: WeatherService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      city: ['', Validators.required]
    });
    this.filteredCityOptions = this.cityFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(city => city ? this._filter(city) : this.cityOptions.slice())
      );
  }

  displayFn(city?: City): string | undefined {
    return city ? city.city : undefined;
  }

  private _filter(city: string): City[] {
    const filterValue = city.toLowerCase();
    return this.cityOptions.filter(option =>
      option.city.toLowerCase().indexOf(filterValue) === 0);
  }

  weatherByCity(city: string) {
    return this.weatherService.getWeatherByCity(city)
      .subscribe(
        next => {
          console.log(next);
          this.weather = new Weather(next);
          this.error = '';
          },
        error => {
          this.error = error.statusText;
          }
      );
  }

  weatherBy5Days(city: string) {
    this.weatherService.getForecastByCity(city)
     .subscribe(
       next => {
         this.forecast = next['list'];
         console.log(this.forecast);
       });
  }
}

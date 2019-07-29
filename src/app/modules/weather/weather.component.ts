import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { WeatherService } from './services/weather.service';
import { Weather } from './shared/models/weather.interface';
import { City } from './shared/models/city.interface';

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
    { city: 'Partyzans’ke' }, { city: 'Berdyansk' },
    { city: 'Kiev' }, { city: 'Zaporizhzhya' }
  ];

  form: FormGroup;
  cityFormControl = new FormControl();
  collectionFormControl = new FormControl();
  filteredCityOptions: Observable<City[]>;
  error = '';
  weather: Array<Weather>;

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
    this.filteredCityOptions = this.cityFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(city => city ? this._filter(city) : this.cityOptions.slice())
      );
    this.weather = [];
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
          this.weather = [];
          this.weather.push(new Weather(next));
          this.error = '';
          },
        error => {
          this.error = error.statusText;
          }
      );
  }

  weatherBy5Days(city: string) {
    this.weatherService.getWeatherBy5Days(city)
     .subscribe(
       next => {
         this.weather = [];
         for (const weather of next['list']) {
           this.weather.push(new Weather(weather));
         }
       }
     );
  }

  weatherBy16Days(city: string) {
    this.weatherService.getWeatherBy16Days(city)
      .subscribe(
        next => {
          this.weather = [];
          for (const weather of next['list']) {
            this.weather.push(new Weather(weather));
          }
        }
      );
  }

  newCitySelect() {
    this.collectionFormControl.patchValue('');
    this.weather = [];
  }
}

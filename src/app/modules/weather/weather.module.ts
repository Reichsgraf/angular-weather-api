import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material-module';

import { WeatherRoutingModule } from './routes/weather-routing.module';
import { WeatherService } from './services/weather.service';
import { WeatherComponent } from './weather.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';

@NgModule({
  imports: [
    CommonModule,
    WeatherRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    WeatherComponent,
    CurrentWeatherComponent
  ],
  entryComponents: [
    WeatherComponent
  ],
  providers: [
    WeatherService
  ]
})
export class WeatherModule {}

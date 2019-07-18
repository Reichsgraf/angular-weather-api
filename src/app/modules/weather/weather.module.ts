import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WeatherRoutingModule } from './routes/weather-routing.module';
import { WeatherService } from './services/weather.service';
import { WeatherComponent } from './weather.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';

@NgModule({
  imports: [
    CommonModule,
    WeatherRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    WeatherComponent,
    CityWeatherComponent
  ]
})
export class WeatherModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WeatherModule,
      providers: [
        WeatherService
      ]
    };
  }
}

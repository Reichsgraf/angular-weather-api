export class Weather {
  city: string;
  temperature: string;
  wind = new Wind();
  cloudiness = new Cloudiness();
  pressure: string;
  humidity: string;

  constructor(weather) {
    this.city = weather.name;
    this.temperature = (weather.main.temp - 273.15).toFixed(2) + ' °C';
    this.wind.speed = weather.wind.speed + ' m/s';
    this.wind.direction = weather.wind.deg;
    // add if-statement for north-sud,east-west
    this.cloudiness.icon = 'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png';
    this.cloudiness.description = weather.weather[0].description;
    this.pressure = weather.main.pressure + ' hpa';
    this.humidity = weather.main.humidity + ' %';
  }
}

export class Wind {
  speed: string;
  direction: string;
}

export class Cloudiness {
  icon: string;
  description: string;
}

export class Weather {
  city: string;
  temperature: string;
  wind = new Wind();
  cloudiness = new Cloudiness();
  pressure: string;
  humidity: string;
  date: string;

  constructor(weather) {
    this.city = weather.name;
    let temp;
    let speed;
    let deg;

    if (weather.main === undefined) {
      temp = weather.temp.day;
      speed = weather.speed;
      deg = weather.deg;
    } else {
      temp = weather.main.temp;
      speed = weather.wind.speed;
      deg = weather.wind.deg;
    }

    this.temperature = (temp - 273.15).toFixed(2) + ' °C';
    this.wind.speed = speed + ' m/s';
    this.wind.direction = deg;
    // add if-statement for north-sud,east-west
    this.cloudiness.icon = 'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png';
    this.cloudiness.description = weather.weather[0].description;
    this.pressure = weather.main.pressure + ' hpa';
    this.humidity = weather.main.humidity + ' %';
    this.date = weather.dt_txt;
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

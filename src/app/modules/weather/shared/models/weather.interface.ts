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
    const temp = (weather.main !== undefined) ? weather.main.temp : weather.temp.day;
    this.temperature = (temp - 273.15).toFixed(2) + ' °C';
    const speed = (weather.wind !== undefined) ? weather.wind.speed : weather.speed;
    this.wind.speed = speed + ' m/s';
    const deg = (weather.wind !== undefined) ? weather.wind.deg : weather.deg;
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

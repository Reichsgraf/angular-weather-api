export class Weather {
  city: string;
  temperature: string;
  wind = new Wind();
  cloudiness = new Cloudiness();
  pressure: string;
  humidity: string;
  date: Date;

  constructor(weather) {
    this.city = weather.name;
    let temp;
    let speed;
    let deg;
    let pressure;
    let humidity;

    if (weather.main === undefined) {
      temp = weather.temp.day;
      speed = weather.speed;
      deg = weather.deg;
      pressure = weather.pressure;
      humidity = weather.humidity;
    } else {
      temp = weather.main.temp;
      speed = weather.wind.speed;
      deg = weather.wind.deg;
      pressure = weather.main.pressure;
      humidity = weather.main.humidity;
    }

    this.temperature = (temp - 273.15).toFixed(2) + ' °C';
    this.wind.speed = speed + ' m/s';
    if (!!deg) {
      this.wind.deg = deg + '°';
    } else {
      this.wind.deg = '';
    }
    if (deg <= 22.5 || deg >= 337.5) {
      this.wind.direction = 'north';
    } else if (deg <= 45) {
      this.wind.direction = 'northeast';
    } else if (deg <= 90) {
      this.wind.direction = 'east';
    } else if (deg <= 135) {
      this.wind.direction = 'southeast';
    } else if (deg >= 315) {
      this.wind.direction = 'northwest';
    } else if (deg >= 270) {
      this.wind.direction = 'west';
    } else if (deg >= 225) {
      this.wind.direction = 'southwest';
    } else {
      this.wind.direction = 'south';
    }
    this.cloudiness.icon = 'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png';
    this.cloudiness.description = weather.weather[0].description;
    this.pressure = pressure + ' hpa';
    this.humidity = humidity + ' %';
    this.date = new Date(weather.dt * 1000);
  }
}

export class Wind {
  speed: string;
  deg: string;
  direction: string;
}

export class Cloudiness {
  icon: string;
  description: string;
}

// 360 / 8 = 45
// 45 / 2 = 22,5
//

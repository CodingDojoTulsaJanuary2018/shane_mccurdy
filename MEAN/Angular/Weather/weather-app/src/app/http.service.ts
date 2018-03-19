import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_ = "http://api.openweathermap.org/data/2.5/weather?q=";
const _API = "&units=imperial&APPID=55542229da06d2a5064eb3596874c2c3";

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {}

  //fucntions to get stuff?

  getWeatherAPI( location ){
    return this._http.get(API_+location+_API);
  }

}

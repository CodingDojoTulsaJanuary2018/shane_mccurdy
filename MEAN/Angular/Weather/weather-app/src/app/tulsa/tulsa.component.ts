import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; // so we can inject it
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tulsa',
  templateUrl: './tulsa.component.html',
  styleUrls: ['./tulsa.component.css']
})
export class TulsaComponent implements OnInit {
  weatherInfo : any;
  locTemp : any;
  loc = "Tulsa";
  tag = ", OK";
  haveTemp = false;
  locImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Tulsa_Skyline.jpg/1920px-Tulsa_Skyline.jpg";
  locMax : any;
  locMin : any;
  locHum : any;
  locDesc : any;
  
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getWeather(this.loc);
  }
  getWeather(location){
    let getBack = this._httpService.getWeatherAPI(location);
    getBack.subscribe(data =>{
      console.log("DATA ---- ", data);
      this.weatherInfo = data;
      this.haveTemp = true;
      this.locTemp = Math.floor(data["main"].temp);
      this.locHum = Math.floor(data["main"].humidity);
      this.locMax = Math.floor(data["main"].temp_max);
      this.locMin = Math.floor(data["main"].temp_min);
      this.locDesc = data["weather"][0].description;
    })
  }

}

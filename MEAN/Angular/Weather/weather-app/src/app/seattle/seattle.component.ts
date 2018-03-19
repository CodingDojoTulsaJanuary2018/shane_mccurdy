import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; // so we can inject it
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seattle',
  templateUrl: './seattle.component.html',
  styleUrls: ['./seattle.component.css']
})
export class SeattleComponent implements OnInit {
  weatherInfo : any;
  locTemp : any;
  loc = "Seattle";
  tag = ", WA";
  haveTemp = false;
  locImg = "https://upload.wikimedia.org/wikipedia/commons/2/2f/Space_Needle002.jpg";
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

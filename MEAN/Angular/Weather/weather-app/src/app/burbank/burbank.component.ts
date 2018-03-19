import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; // so we can inject it
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-burbank',
  templateUrl: './burbank.component.html',
  styleUrls: ['./burbank.component.css']
})
export class BurbankComponent implements OnInit {
  weatherInfo : any;
  locTemp : any;
  loc = "Burbank";
  tag = ", CA";
  haveTemp = false;
  locImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Burbank_media_district_from_Griffith_Park_2015-11-07.jpg/1920px-Burbank_media_district_from_Griffith_Park_2015-11-07.jpg";
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

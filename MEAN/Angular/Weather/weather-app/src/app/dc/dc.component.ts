import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; // so we can inject it
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dc',
  templateUrl: './dc.component.html',
  styleUrls: ['./dc.component.css']
})
export class DcComponent implements OnInit {
  weatherInfo : any;
  locTemp : any;
  locImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/White_House_lawn_%281%29.tif/lossy-page1-1920px-White_House_lawn_%281%29.tif.jpg";
  loc = "Washington";
  tag = " DC";
  haveTemp = false;
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

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; // so we can inject it
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-chicago',
  templateUrl: './chicago.component.html',
  styleUrls: ['./chicago.component.css']
})
export class ChicagoComponent implements OnInit {
  weatherInfo : any;
  locTemp : any;
  locImg = "https://4.bp.blogspot.com/-CCNv9SpMOwU/Wo2-ilO2x7I/AAAAAAAAgD4/r5gIzSEjNH8NULqUxMMgpJIPrmTM-m_hQCPcBGAYYCw/s1600/Chicago.gif";
  loc = "Chicago";
  tag = ", IL";
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

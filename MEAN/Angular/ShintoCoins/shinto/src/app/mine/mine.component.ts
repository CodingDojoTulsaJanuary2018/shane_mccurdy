import { Component, OnInit } from '@angular/core';
import { ShintoService } from '../shinto.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {

  constructor(private _shintoService: ShintoService){} //<-- "injection"

  ngOnInit() {
  }

  answer = {
    placeholder : "Number",
    answer: ""
  }
  

  mineACoin(){
    let oneCoin: any;
    if (this.answer.answer == "8"){
      oneCoin = this._shintoService.mineCoin();
      this.answer.placeholder = "Number";
      this.answer.answer = "";
    } else {
      this.answer.placeholder = "Nope, try again!"
      this.answer.answer = "";
    }
  }
}

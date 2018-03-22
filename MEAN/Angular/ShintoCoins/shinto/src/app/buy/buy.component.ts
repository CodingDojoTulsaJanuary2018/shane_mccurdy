import { Component, OnInit } from '@angular/core';
import { ShintoService } from '../shinto.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  constructor(private _shintoService: ShintoService){} //<-- "injection"

  ngOnInit() {
    this.updateCoins();
  }

  amount = {
    placeholder : "Number",
    amount: null
  }
  bank = {
    value: null,
    balance: null
  }

  updateCoins(){
    this.bank = this._shintoService.getBank();
  }

  buyCoins(){
    let boughtCoin: any;
    if (this.amount.amount > 0){
      boughtCoin = this._shintoService.buyCoin(this.amount.amount );
      this.amount.placeholder = "Number";
      this.amount.amount = null;
      this.updateCoins();      
    } else {
      this.amount.placeholder = "Nope, can't do that!"
      this.amount.amount = null;
    }
  }


}

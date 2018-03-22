import { Component, OnInit } from '@angular/core';
import { ShintoService } from '../shinto.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

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

  sellSomeCoins(){
    let soldCoin: any;
    if (this.amount.amount > 0 && this.amount.amount <= this.bank.balance){
      soldCoin = this._shintoService.sellCoin(this.amount.amount );
      this.amount.placeholder = "Number";
      this.amount.amount = null;
      this.updateCoins();      
    } else {
      this.amount.placeholder = "Nope, can't do that!"
      this.amount.amount = null;
    }
  }
}

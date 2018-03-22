import { Injectable } from '@angular/core';

@Injectable()
export class ShintoService {
    // constructor (){}
  constructor(
    // private bank : any
    // private ledger : any
  ){
    // this.bank = {
    //   value: 0,
    //   balance: 0
    // }
    // this.ledger = [];
  }
  // private bank : any
  // private ledger : any

  bank = {
    value: 0,
    balance: 0
  }
  ledger = [];
  
  getBank(){
    return {value: this.bank.value, balance: this.bank.balance}
  }
  getLedger(){
    return {ledger: this.ledger}
  }
  getLedgerById(theId){ // the index of a transaction is stored in the "id" for ease 
    if (this.ledger[theId]) {
      return {ledger: this.ledger[theId]}
    } else {
      return false;
    }
    
  }
  mineCoin(){
    let d = new Date();
    this.bank.value++;
    this.bank.balance++;
    this.ledger.push({
      action: "Mined",
      amount: "1",
      value: this.bank.value.toString(),
      transID: d.getTime().toString(),
      id: this.ledger.length
    });
    console.log("mineCoin ran -- ", this.ledger);
    return this.ledger;
  }
  buyCoin(theAmount){
    let d = new Date();
    this.bank.value++;
    this.bank.balance+= theAmount;
    this.ledger.push({
      action: "Bought",
      amount: theAmount.toString(),
      value: this.bank.value.toString(),
      transID: d.getTime().toString(),
      id: this.ledger.length
    });
    console.log("buyCoin ran -- ", this.ledger);
    return this.ledger;
  }
  sellCoin(theAmount){
    let d = new Date();
    this.bank.value--;
    this.bank.balance-= theAmount;
    this.ledger.push({
      action: "Sold",
      amount: theAmount.toString(),
      value: this.bank.value.toString(),
      transID: d.getTime().toString(),
      id: this.ledger.length
    });
    console.log("sellCoin ran -- ", this.ledger);
    return this.ledger;
  }


}

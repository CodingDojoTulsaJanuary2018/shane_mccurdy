import { Component, OnInit } from '@angular/core';
import { ShintoService } from '../shinto.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(
    private _shintoService: ShintoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.getTheTrans( params['id'] ))
    //console.log(params['id'])); //router
  }
  theTrans : any;

  getTheTrans(theId){
    this.theTrans = this._shintoService.getLedgerById(theId);
  }
}

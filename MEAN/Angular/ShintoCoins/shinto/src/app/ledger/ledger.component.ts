import { Component, OnInit } from '@angular/core';
import { ShintoService } from '../shinto.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {

  constructor(
    private _shintoService: ShintoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){} //<-- "injection"

  ngOnInit() {
    this.updateLedger();
    this._route.params.subscribe((params: Params)=>{})
    //=> console.log(params['id'])); //router
  }

  ledger : any;

  updateLedger(){
    this.ledger = this._shintoService.getLedger();
  }

  goToTrans(id) {
    this._router.navigate(['/transaction', id]);
  }

}

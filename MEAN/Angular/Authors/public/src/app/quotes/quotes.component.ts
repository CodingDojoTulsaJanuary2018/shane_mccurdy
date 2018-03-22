import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service'; //<-- the generated service
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  author : any;
  form ={
    placeholder : ""
  }
  id = ""

  constructor(
    private _DbService: DbService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {} //<-- "injection"

  ngOnInit() {
    this.author = false;
    this._route.params.subscribe((params: Params)=>{
      this.id = params.id;
      this.getAuthor();
    })
  }
  getAuthor(){
    let ob = this._DbService.getAuthorByID(this.id);
    ob.subscribe(data=>{
      console.log(data);
      this.author = data['this_author'];
    })
  }
  voteUp(q_id){
    let ob = this._DbService.voteUp(q_id, 1);
    ob.subscribe(data=>{
      console.log(data);
      this.getAuthor(); //repopulates the table
    })
  }
  voteDown(q_id){
    let ob = this._DbService.voteUp(q_id, -1);
    ob.subscribe(data=>{
      console.log(data);
      this.getAuthor(); //repopulates the table
    })
  }
  deleteQuote(q_id){
    let ob = this._DbService.deleteQuoteByID(q_id);
    ob.subscribe(data=>{
      console.log(data);
      this.getAuthor(); //repopulates the table
    })
  }
  goToWrite(){
    this._router.navigate(['/write', this.id]);
  }
  goToHome(){
    this._router.navigate(['/']);
  }
}

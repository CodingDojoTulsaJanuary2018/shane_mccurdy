import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service'; //<-- the generated service
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  author ={
    quote: "",
    id: ""
  }
  form ={
    placeholder : ""
  }

  constructor(
    private _DbService: DbService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {} //<-- "injection"

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.author.id = params.id
    })
  }


  writeQuote(){
    if (this.author.quote.length == 0){
      this.form.placeholder = "Please enter a quote...";
    } else if(this.author.quote.length < 3){
      this.form.placeholder = "Too short!";
    } else {
      let ob = this._DbService.pushQuote(this.author);
      ob.subscribe(data=>{
        console.log(data);
        this.goToQuotes(); 
      })
    }
    
  }

  goToQuotes(){
    this._router.navigate(['/quotes', this.author.id]);
  }

}

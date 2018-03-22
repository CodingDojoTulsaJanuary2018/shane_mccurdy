import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service'; //<-- the generated service
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  author ={
    name: ""
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

  }
  
  addAuthor(){
    if (this.author.name.length == 0){
      this.form.placeholder = "Please enter a name...";
    } else if(this.author.name.length < 3){
      this.form.placeholder = "Too short!";
    } else {
      let ob = this._DbService.createAuthor(this.author);
      ob.subscribe(data=>{
        console.log(data);
        this.goToHome(); 
      })
    }
    
  }

  goToHome(){
    this._router.navigate(['/']);
  }


}

import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service'; //<-- the generated service
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors : any;

  constructor(
    private _DbService: DbService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {} //<-- "injection"

  ngOnInit() {
    this.authors=false;
    this.getAllTheAuthors();
    this._route.params.subscribe((params: Params)=>{})
  }

  getAllTheAuthors(){
    let ob = this._DbService.getAuthors();
    ob.subscribe(data=>{
      this.authors = data;
      console.log(data);  
    })
  }
  goToQuotes(id){
    this._router.navigate(['/quotes', id]);
  }
  goToAdd(){
    this._router.navigate(['/new']);
  }
  goToEdit(id){
    this._router.navigate(['/edit', id]);
  }
  deleteAuthor(id){
    let ob = this._DbService.deleteAuthorByID(id);
    ob.subscribe(data=>{
      console.log("home.ts",data);
      this.getAllTheAuthors(); //refresh the list
    })
  }
}

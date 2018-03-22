import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service'; //<-- the generated service
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  author ={
    name: "",
    id: ""
  }
  form ={
    placeholder : ""
  }
  params:any;

  constructor(
    private _DbService: DbService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {} //<-- "injection"

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.populateAuthor(params.id)
    })
  }
  populateAuthor(id){
    let ob = this._DbService.getAuthorByID(id);
    ob.subscribe(data=>{
      console.log(data);
       this.author = {
         name : data['this_author'].name,
         id : id
       }
    })
  }


  updateAuthor(){
    if (this.author.name.length == 0){
      this.form.placeholder = "Please enter a name...";
    } else if(this.author.name.length < 3){
      this.form.placeholder = "Too short!";
    } else {
      let ob = this._DbService.updateAuthor(this.author);
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

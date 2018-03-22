import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'; //<-- Router stuff

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
      private _route: ActivatedRoute,
      private _router: Router
    ){} //<-- "injection"
  
    ngOnInit(){
    // this._route.params.subscribe((params: Params) => console.log(params['id'])); //router
    
  }

}

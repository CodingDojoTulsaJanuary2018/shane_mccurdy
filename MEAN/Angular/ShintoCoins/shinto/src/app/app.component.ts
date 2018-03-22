import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(            
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    this._route.params.subscribe((params: Params) => console.log(params['id'])); //router
    // this.tasks = false;   //use in html template with *ngIf="tasks"
    // this.getTasksFromService();
  }




}


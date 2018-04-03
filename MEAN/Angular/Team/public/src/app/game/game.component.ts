import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; //<-- the generated service
import { ActivatedRoute, Params, Router } from '@angular/router'; //<-- Router stuff

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  all_players : any;
  the_game : any;
  game_name : String;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.all_players = false;
    this._route.params.subscribe((params: Params) =>{
      this.populateTheGame( params['num'] );
    }); 
  }

  setGameName(g_id){
    switch(g_id){
      case "default":
        this.game_name = "GAME 1";
        break;
      default:
        this.game_name = "GAME " + g_id.toString();
    }
  }

  populateTheGame(g_id="default"){
    this.setGameName(g_id);
    let ob = this._httpService.getOneGame(g_id);
    ob.subscribe(data=>{
      console.log("DATA : ", data);
      this.the_game = data['game'];
      this.all_players = data['game'].roster;
      console.log("ALL PLAYERS : ", this.all_players);
    })
  }
  sendUpdatedRoster(){
    let update = {updated_roster :this.all_players} 
    let ob = this._httpService.updateOneGame(this.the_game._id, update);
    ob.subscribe(data=>{
      console.log("UPDATED ROSTER - ",data);
      
    })
  }
  setPlaying(p_id){
    console.log("PLAYING - ", p_id);
    for (let player of this.all_players){
      if (player['player_id'] == p_id ){
        player['player_status'] = 1;
        this.sendUpdatedRoster();
        break;
      }
    }
  }
  setNotPlaying(p_id){
    console.log("NOT PLAYING - ", p_id);
    for (let player of this.all_players){
      if (player['player_id'] == p_id ){
        player['player_status'] = -1;
        this.sendUpdatedRoster();
        break;
      }
    }
  }
  setUndecided(p_id){
    console.log("UNDECIDED - ", p_id);
    for (let player of this.all_players){
      if (player['player_id'] == p_id ){
        player['player_status'] = 0;
        this.sendUpdatedRoster();
        break;
      }
    }
  }
}

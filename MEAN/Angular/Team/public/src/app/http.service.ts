import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //<--

@Injectable()
export class HttpService {

  gameDict = {
    "1":"5ab6c411252357f775475beb",
    "2":"5ab9421241d96106e1d3b167",
    "3":"5ab9428241d96106e1d3b168",
    "default":"5ab6c411252357f775475beb"
  }

  constructor(private _http: HttpClient) { }

  //get all players
  getAllPlayers(){
    return this._http.get('/player');
  }

  //add player
  createNewPlayer(new_player){
    return this._http.post('/player',{new_player: new_player});
  }
  
  //get games
  getOneGame(id){
    return this._http.get('/game/'+ this.gameDict[id]);
  }
  //update game-player status
  updateOneGame(id, update){
    return this._http.put('/game/'+ id + '/updateroster', update);
  }
  
  //reset game-roster //todo??

  //delete a player - updates game-roster too?
  deleteOnePlayer(p_id){
    return this._http.delete('/player/'+p_id);
  }
  getPlayer(q){
    console.log("Q in Service - ",q);
    return this._http.post('/player/q', q);
  }
}

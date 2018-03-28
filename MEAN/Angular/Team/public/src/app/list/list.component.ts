import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; //<-- the generated service
import { ActivatedRoute, Params, Router } from '@angular/router'; //<-- Router stuff

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  all_players : any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.all_players = false;
    this.populateAll_players();
  }
  populateAll_players(){
    let ob = this._httpService.getAllPlayers();
    ob.subscribe(data=>{
      console.log("DATA : ", data);
      this.all_players = data['players'];
      console.log("ALL PLAYERS : ", this.all_players);
    })
  }

  deletePlayer(id, name){
    console.log("GOT THIS ID TO DELETE ---> ",id);
    let kill = confirm("Are you sure you want to delete "+name+"?");
    if (kill){
      let ob = this._httpService.deleteOnePlayer(id);
      ob.subscribe(data=>{
        console.log(data);
        this.purgeRosters(id);
        this.populateAll_players();
      })
    }
  }//end deletePlayer


  purgeRosters(p_id){
    
    let get1 = this._httpService.getOneGame("1");
    get1.subscribe(game1=>{
      console.log(game1['game'].roster);
      let temp1 = [];
      for(let x = 0; x < game1['game'].roster.length; x++){
        if (game1['game'].roster[x].player_id == p_id){
          console.log("CUTTING FROM GAME1 :", game1['game'].roster[x]);
          game1['game'].roster.slice(x,1);        
        } else {
          temp1.push(game1['game'].roster[x]);
        }
      }
      console.log(game1['game'].roster);
      let send1 = this._httpService.updateOneGame(game1['game']._id, {updated_roster: temp1});
      send1.subscribe(data=>{
        console.log("DATA : ",data);
      })
    }) //end game1

    let get2 = this._httpService.getOneGame("2");
    get2.subscribe(game2=>{
      console.log(game2['game'].roster);
      let temp2 = [];
      for(let x = 0; x < game2['game'].roster.length; x++){
        if (game2['game'].roster[x].player_id == p_id){
          console.log("CUTTING FROM GAME2 :", game2['game'].roster[x]);
          game2['game'].roster.slice(x,1);
        }else {
          temp2.push(game2['game'].roster[x]);
        }
      }
      console.log(game2['game'].roster);
      let send2 = this._httpService.updateOneGame(game2['game']._id, {updated_roster: temp2});
      send2.subscribe(data=>{
        console.log("DATA : ",data);
      })
    }) //end game2

    let get3 = this._httpService.getOneGame("3");
    get3.subscribe(game3=>{
      console.log(game3['game'].roster);
      let temp3 = [];
      for(let x = 0; x < game3['game'].roster.length; x++){
        if (game3['game'].roster[x].player_id == p_id){
          console.log("CUTTING FROM GAME3 :", game3['game'].roster[x]);
        } else {
          temp3.push(game3['game'].roster[x]);
        }
      }
      console.log(game3['game'].roster);
      let send1 = this._httpService.updateOneGame(game3['game']._id, {updated_roster: temp3});
      send1.subscribe(data=>{
        console.log("DATA : ",data);
      })
    }) //end game3

  }//end addToRoster


}

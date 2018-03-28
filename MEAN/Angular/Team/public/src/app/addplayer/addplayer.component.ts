import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; //<-- the generated service
import { ActivatedRoute, Params, Router } from '@angular/router'; //<-- Router stuff

@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
  styleUrls: ['./addplayer.component.css']
})
export class AddplayerComponent implements OnInit {
  new_player_info = {
    name: "",
    position: ""  
  }
  feedback: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.feedback = [];
  }

  addPlayer(){
    console.log("ADD PLAYER");
    let good = true;
    this.feedback = [];
    if (this.new_player_info.name == ""){
      this.feedback.push("Yo! You need to at least put a name.")
      good = false;
    } else if (this.new_player_info.name.length < 2){
      this.feedback.push("Player names have to be at least 2 characters")
      good = false;
    } else if( good ){
      let check = this._httpService.getPlayer({q:{name: this.new_player_info.name}});
      check.subscribe(data=>{
        console.log("CHECK DATA : ",data);
        if(data['players'].length){
          console.log("_______DUPS!");
          this.feedback.push("New player names have to be unique")
        } else {
          if ((this.new_player_info.position == "") && good){
            this.new_player_info.position = "none"; 
          }
          let ob = this._httpService.createNewPlayer(this.new_player_info);
          ob.subscribe(data=>{
            console.log("ADD PLAYER : ", data);
            this.addToRosters(data);
            this.new_player_info = {
              name: "",
              position: ""  
            }
            this.feedback = [];
            this._router.navigate(['players/list']); //home with router
          })
        }
      }) 
    } 
  }

  addToRosters(new_player){
    let pushMe = {
      player_id : new_player['player']._id,
      player_name : new_player['player'].name,
      player_status : 0
    }
    console.log(pushMe);
    
    let get1 = this._httpService.getOneGame("1");
    get1.subscribe(game1=>{
      console.log(game1['game'].roster);
      game1['game'].roster.push(pushMe);
      console.log(game1['game'].roster);
      let send1 = this._httpService.updateOneGame(game1['game']._id, {updated_roster :game1['game'].roster});
      send1.subscribe(data=>{
        console.log("DATA : ",data);
      })
    }) //end game1

    let get2 = this._httpService.getOneGame("2");
    get2.subscribe(game2=>{
      console.log(game2['game'].roster);
      game2['game'].roster.push(pushMe);
      console.log(game2['game'].roster);
      let send2 = this._httpService.updateOneGame(game2['game']._id, {updated_roster :game2['game'].roster});
      send2.subscribe(data=>{
        console.log("DATA : ",data);
      })
    }) //end game2

    let get3 = this._httpService.getOneGame("3");
    get3.subscribe(game3=>{
      console.log(game3['game'].roster);
      game3['game'].roster.push(pushMe);
      console.log(game3['game'].roster);
      let send1 = this._httpService.updateOneGame(game3['game']._id, {updated_roster :game3['game'].roster});
      send1.subscribe(data=>{
        console.log("DATA : ",data);
      })
    }) //end game3

  }//end addToRoster
}

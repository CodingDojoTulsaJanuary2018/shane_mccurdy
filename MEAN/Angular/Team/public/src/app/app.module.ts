import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { PlayerRoutingModule } from './players/player-routing.module'; //child route
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { ListComponent } from './list/list.component';
import { AddplayerComponent } from './addplayer/addplayer.component';
import { StatusComponent } from './status/status.component';

import { HttpService } from './http.service'; //<-- generated service
import { HttpClientModule } from '@angular/common/http'; //<-- needed for http
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component'; //<-- for two-way binding


@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    ListComponent,
    AddplayerComponent,
    StatusComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlayerRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

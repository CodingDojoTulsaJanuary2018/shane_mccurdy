import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersComponent } from './players/players.component';
import { ListComponent } from './list/list.component';
import { AddplayerComponent } from './addplayer/addplayer.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  {path: 'status', component: StatusComponent},
  {path: 'status/game/:num', component: StatusComponent},
  
  {path: '', pathMatch: 'full', redirectTo: 'players/list' }
];

// {path: 'players', component: PlayersComponent},

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

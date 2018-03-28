import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersComponent } from '../players/players.component';
import { ListComponent } from '../list/list.component';
import { AddplayerComponent } from '../addplayer/addplayer.component';

const playerRoutes: Routes = [
    {path: 'players', component: PlayersComponent, 
    children:[
        {path: 'list', component: ListComponent},
        {path: 'addplayer', component: AddplayerComponent},
        {path: '', pathMatch: 'full', redirectTo: 'list' }
    ]},   
];

@NgModule({
    imports: [
      RouterModule.forChild(playerRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class PlayerRoutingModule { }
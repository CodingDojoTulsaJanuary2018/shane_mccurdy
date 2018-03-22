import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyComponent } from './buy/buy.component';
import { HomeComponent } from './home/home.component';
import { LedgerComponent } from './ledger/ledger.component';
import { MineComponent } from './mine/mine.component';
import { SellComponent } from './sell/sell.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {path: 'buy', component: BuyComponent},
  {path: 'home', component: HomeComponent},
  {path: 'ledger', component: LedgerComponent},
  {path: 'mine', component: MineComponent},
  {path: 'sell', component: SellComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: 'transaction/:id', component: TransactionComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { WriteComponent } from './write/write.component';
import { QuotesComponent } from './quotes/quotes.component';



const routes: Routes = [
  {path: 'new', component: NewComponent},
  {path: '', component: HomeComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'quotes/:id', component: QuotesComponent},
  {path: 'write/:id', component: WriteComponent},
  {path: 'home', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

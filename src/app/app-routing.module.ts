import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddOperatorComponent } from './add-operator/add-operator.component';
import { ViewOperatorComponent } from './view-operator/view-operator.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddOperatorComponent },
  { path: 'view', component: ViewOperatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

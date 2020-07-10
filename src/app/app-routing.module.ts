import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from "./components/matches/matches.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':competitionName', component: MatchesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

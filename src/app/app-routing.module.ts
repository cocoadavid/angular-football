import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from "./components/matches/matches.component";
import {MatchDetailsComponent} from "./components/match-details/match-details.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':competitionName', component: MatchesComponent},
  { path: ':competitionName/:matchId', component: MatchDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

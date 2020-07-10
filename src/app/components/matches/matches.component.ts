import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {FootballDataService} from "../../services/football-data.service";
import {Competition} from "../../models/competition";
import {Match} from "../../models/match";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  competitionName: string;
  competition: Competition;
  matches: Match[];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private footballDataService: FootballDataService
  ) { }

  ngOnInit(): void {
    this.competitionName = this.route.snapshot.params.competitionName;
    localStorage.setItem("lastCompetitionCode", this.competitionName);
    this.loading = true;
    this.footballDataService.getMatches(this.competitionName).subscribe(data => {
      console.log(data)
      this.loading = false;
      this.competition = data["competition"];
      this.matches = data["matches"];
    })
  }

}

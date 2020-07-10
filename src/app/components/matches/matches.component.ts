import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {FootballDataService} from "../../services/football-data.service";
import {Competition} from "../../models/competition";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  competitionName: string;
  competition: Competition;
  matches: any[];
  constructor(
    private route: ActivatedRoute,
    private footballDataService: FootballDataService
  ) { }

  ngOnInit(): void {
    this.competitionName = this.route.snapshot.params.competitionName;
    this.footballDataService.getMatches(this.competitionName).subscribe(data => {
      console.log(data)
      this.competition = data["competition"];
      this.matches = data["matches"];
    })
  }

}

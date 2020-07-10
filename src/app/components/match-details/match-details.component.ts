import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {FootballDataService} from "../../services/football-data.service";
import {MatchDetails} from "../../models/match-details";

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  matchId: number;
  matchDetails: MatchDetails;
  competitionCode: string;

  constructor(
    private route: ActivatedRoute,
    private footballDataService: FootballDataService
  ) {
    this.competitionCode = localStorage.getItem("lastCompetitionCode");
  }

  ngOnInit(): void {
    this.matchId = this.route.snapshot.params.matchId;
    this.footballDataService.getMatchDetails(this.matchId).subscribe(data => {
      console.log(data);
      this.matchDetails = data["match"];
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {FootballDataService} from "../../services/football-data.service";
import {BreadcrumbItem} from "../../models/breadcrumb-item";

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  matchId: number;
  matchDetails;
  competitionCode: string;
  breadcrumbItems: BreadcrumbItem[];

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
      this.breadcrumbItems = [
        new BreadcrumbItem(
          this.matchDetails?.competition?.name || this.competitionCode,
          `/${this.competitionCode}`,
          false
        ),
        new BreadcrumbItem(
          "Match",
          `#`,
          true
        ),
      ];
    })
  }

}

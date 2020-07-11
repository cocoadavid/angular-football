import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {FootballDataService} from "../../services/football-data.service";
import {BreadcrumbItem} from "../../models/breadcrumb-item";
import {MatchDetails} from "../../interfaces/match-details";
import { timer } from 'rxjs';
import * as moment from 'moment';
import {diffBetweenDatesInMinutes} from "../../../assets/helperFunctions";

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit, OnDestroy {
  matchId: number;
  matchDetails: MatchDetails;
  competitionCode: string;
  breadcrumbItems: BreadcrumbItem[];
  moment: any = moment;
  matchClock: number;
  subscription;

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
      this.timerForMatchClock();
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

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  private timerForMatchClock(){
    const source = timer(1000, 1000 * 60);
    this.subscription = source.subscribe(val => {
      this.calculateMatchClock();
    });
  }
  // the free pricing for the football-data.org API does not provide info about the match clock
  // therefore I calculate it using the start time and current time
  // because of this there may be differences compared to the actual match clock
  private calculateMatchClock(){
    if(this.matchDetails?.utcDate){
      let now = new Date();
      let startDate = new Date(this.matchDetails.utcDate);
      if(this.matchDetails.status === "IN_PLAY"){
        let diffInMinutes = diffBetweenDatesInMinutes(now, startDate);
        // if it is second half, subtract 20 minutes (15 minutes + injury time, extra time, etc)
        this.matchClock = this.isFirstHalf() ? diffInMinutes : diffInMinutes - 20;
      }
    }
  }

  private isFirstHalf(){
    if(this.matchDetails?.score){
      if(
        this.matchDetails.status === "IN_PLAY" &&
        this.matchDetails.score.halfTime?.homeTeam === null
      ){
        return true;
      }
    }
    return false;
  }

}

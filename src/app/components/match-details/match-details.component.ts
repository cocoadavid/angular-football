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
  loading: boolean;
  matchClockSubscription;
  matchSubscription;

  constructor(
    private route: ActivatedRoute,
    private footballDataService: FootballDataService
  ) {
    this.competitionCode = localStorage.getItem("lastCompetitionCode");
  }

  ngOnInit(): void {
    this.matchId = this.route.snapshot.params.matchId;
    this.loading = true;
    this.footballDataService.getMatchDetails(this.matchId).subscribe(data => {
      this.loading = false;
      this.matchDetails = data["match"];
      this.timerForMatchClock();
      this.timerForMatch();
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
    this.matchClockSubscription.unsubscribe();
    this.matchSubscription.unsubscribe();
  }

  private timerForMatch(){
    // update every minute
    const source = timer(1000 * 60, 1000 * 60);
    this.matchSubscription = source.subscribe(val => {
      this.footballDataService.getMatchDetails(this.matchId).subscribe(data => {
        this.matchDetails = data["match"];
      })
    });
  }

  private timerForMatchClock(){
    // update every minute
    const source = timer(1000, 1000 * 60);
    this.matchClockSubscription = source.subscribe(val => {
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
        // if it is second half, subtract 18 minutes (15 minutes + injury time, extra time, etc)
        this.matchClock = this.isFirstHalf() ? diffInMinutes : diffInMinutes - 18;
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

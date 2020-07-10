import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FootballDataService {
  private rootUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  constructor(
    private http: HttpClient
  ) { }

  getCompetitions(){
    const params = new HttpParams()
      .set('plan', 'TIER_ONE')
    return this.http.get(`${this.rootUrl}/competitions/`,
      {
        headers: {"X-Auth-Token": this.apiKey},
        params
      })
  }

  getMatches(competitionName){
    const params = new HttpParams()
      .set('dateFrom', moment().format("YYYY-MM-DD"))
      .set('dateTo', moment().add(1, "month").format("YYYY-MM-DD"))
    return this.http.get(`${this.rootUrl}/competitions/${competitionName}/matches`,
      {
        headers: {"X-Auth-Token": this.apiKey},
        params
      })
  }

  getMatchDetails(matchId){
    return this.http.get(`${this.rootUrl}/matches/${matchId}`,
      {
        headers: {"X-Auth-Token": this.apiKey},
      })
  }
}

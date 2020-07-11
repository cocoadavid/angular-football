import {Competition} from "./competition";
import {Score} from "./score";

export interface MatchDetails {
  awayTeam: object;
  group: string;
  homeTeam: object;
  id: number;
  lastUpdated: string;
  matchday: number;
  odds: object;
  referees: object[];
  score: Score;
  season: object;
  stage: string;
  status: string;
  utcDate: string;
  competition: Competition;
  venue: string;
}

export interface Score {
  duration: string;
  extraTime: scoreTime;
  fullTime: scoreTime;
  halfTime: scoreTime;
  penalties: object;
  winner: string;
}

interface scoreTime {
  homeTeam: any;
  awayTeam: any;
}

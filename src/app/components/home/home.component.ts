import { Component, OnInit } from '@angular/core';
import {FootballDataService} from "../../services/football-data.service";
import {Competition} from "../../models/competition";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  competitions: Competition[];
  constructor(
    private footballDataService: FootballDataService,
  ) { }

  ngOnInit(): void {
    this.footballDataService.getCompetitions().subscribe(data => {
      this.competitions = data["competitions"];
      console.log(this.competitions)
    })
  }
}

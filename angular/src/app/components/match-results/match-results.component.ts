import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, matchData } from 'src/app/services/data.service';

@Component({
  selector: 'app-match-results',
  templateUrl: './match-results.component.html',
  styleUrls: ['./match-results.component.css']
})
export class MatchResultsComponent {

  constructor(private dataService:DataService, private router:Router){}
  PAST_12_DAY_MATCHES:matchData= {
    id: 0,
    abbreviation: '',
    conference: '',
    full_name: '',
    matches_played: [],
    win_or_loss: [],
    avg_points_scored: 0,
    avg_points_conceded: 0
  };
  ngOnInit(){
    this.dataService.TEAM_DATA.subscribe((data: matchData) => this.PAST_12_DAY_MATCHES = data)
  }
  Back(){
    this.router.navigate(['/'])
  }
}

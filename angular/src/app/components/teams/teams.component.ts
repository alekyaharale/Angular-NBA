import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService, MatchesApiResponse, TeamsApiResponse, matchData, matchScores, teamData } from 'src/app/services/data.service';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  constructor(private api:ApiService, private router:Router, private dataService:DataService){}

  TEAMS_DATA: teamData[] =[]
  DISPLAY_DATA: matchData[]  = []
  selected_team:string =''
  past12dates:string[] = []
  
  SINGLE_TEAM_DATA: teamData = {
    abbreviation: '',
    conference: '',
    full_name: '',
    id: 0,
    city: '',
  };

  ngOnInit(){
    this.teamsData()
    this.dataService.LIST_DATA.subscribe((ele:matchData[]) => {
      // console.log(ele)
      if(ele)
       this.DISPLAY_DATA = ele
      }
    )
  }
  teamsData(): void {
    this.api.getTeams().subscribe({
      next: (response: TeamsApiResponse) => {
        this.TEAMS_DATA = response.data
      },
      error: (err) => {
        alert('There was an error in retrieving data from the server');
      }
    });
  }

  teamTracker(){
    this.getGamesData()
  }
  getGamesData(): void {
    let temp = this.TEAMS_DATA.filter((ele:teamData)=>{
      return ele.id === parseInt(this.selected_team)
    })
    this.SINGLE_TEAM_DATA = temp[0]
    this.api.getMatches(parseInt(this.selected_team), this.getDates()).subscribe((res: MatchesApiResponse) => {
      // console.log(res.data)
       let data = res.data
       this.modifyData(data)    
    });
  }

  modifyData(getData:matchScores[]):void{
   let MATCH_DATA: matchData = {
      id: 0,
      abbreviation: '',
      conference: '',
      full_name: '',
      matches_played: [],
      win_or_loss: [],
      avg_points_scored: 0,
      avg_points_conceded: 0
    };
    MATCH_DATA.id = this.SINGLE_TEAM_DATA.id
    MATCH_DATA.abbreviation = this.SINGLE_TEAM_DATA.abbreviation
    MATCH_DATA.full_name = this.SINGLE_TEAM_DATA.full_name
    MATCH_DATA.conference = this.SINGLE_TEAM_DATA.conference

    let points_scored = 0;
    let points_conceded = 0;
    getData.forEach((element: matchScores) => {
      if (element.home_team.id == parseInt(this.selected_team)) {
        points_scored += element.home_team_score;
        points_conceded += element.visitor_team_score;
          
        if (element.home_team_score > element.visitor_team_score) {
          MATCH_DATA.win_or_loss.push('W');
        } else if (element.home_team_score < element.visitor_team_score) {
         MATCH_DATA.win_or_loss.push('L');
        }
      } else {
        points_scored += element.visitor_team_score;
        points_conceded += element.home_team_score;
        if (element.home_team_score < element.visitor_team_score) {
          MATCH_DATA.win_or_loss.push('W');
        } else if (element.home_team_score > element.visitor_team_score) {
          MATCH_DATA['win_or_loss'].push('L');
        }
      }
      MATCH_DATA['matches_played'].push(element);
    });
     MATCH_DATA.avg_points_scored = Math.round(points_scored / MATCH_DATA.matches_played.length);
     MATCH_DATA.avg_points_conceded = Math.round(points_conceded / MATCH_DATA.matches_played.length);
    let temp_data = JSON.parse(JSON.stringify(MATCH_DATA))
    const checkIfTeamAlreadyPresent = this.DISPLAY_DATA.some((el: matchData) => el.id === temp_data.id);
   
    if (!checkIfTeamAlreadyPresent){
      this.DISPLAY_DATA.push(temp_data)
      this.selected_team = ''
    }
  
    // console.log(this.DISPLAY_DATA)

  }

  getDates(): string[] {
    this.past12dates = [];
    let date: Date = new Date();
    for (let i = 1; i <= 12; i++) {
      date.setDate(date.getDate() - 1);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      this.past12dates.push(`${year}-${month}-${day}`);
    }
    return this.past12dates;
  }


  removeTeam(id: number): void {
    this.DISPLAY_DATA = this.DISPLAY_DATA.filter((team: matchData) => { return team.id !== id });
    // console.log(this.DISPLAY_DATA)
  }

  seeAllResults(team:matchData): void {
    this.dataService.TEAM_DATA.next(team)
    this.dataService.LIST_DATA.next(this.DISPLAY_DATA)

    this.router.navigate(['results/'+team.id])
  }


}

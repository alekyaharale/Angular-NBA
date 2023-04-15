import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface teamData {
  abbreviation: string,
  conference: string,
  full_name: string,
  id: number,
  city: string,
}

export interface matchData {
  id: number,
  abbreviation: string,
  conference: string,
  full_name: string,
  matches_played: matchScores[],
  win_or_loss: string[],
  avg_points_scored: number,
  avg_points_conceded: number
}

export interface matchScores {
  home_team: {
    abbreviation: string,
    id:number
  },
  visitor_team: {
    abbreviation: string,
    id: number
  },
  home_team_score: number,
  visitor_team_score: number
}
export interface TeamsApiResponse {
  data: teamData[]
}
export interface MatchesApiResponse {
  data: matchScores[]
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  initialData: matchData = {
    id: 0,
    abbreviation: '',
    conference: '',
    full_name: '',
    matches_played: [],
    win_or_loss: [],
    avg_points_scored: 0,
    avg_points_conceded: 0
  };
  constructor() { }
  TEAM_DATA = new BehaviorSubject<matchData>(this.initialData);
  LIST_DATA = new BehaviorSubject<matchData[]>([]);

}

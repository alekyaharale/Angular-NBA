import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatchesApiResponse, TeamsApiResponse, teamData } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  header = new HttpHeaders({
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
  });

  CUSTOM_API = 'https://free-nba.p.rapidapi.com';


  getTeams(): Observable<TeamsApiResponse> {
    return this.http.get<TeamsApiResponse>(`${this.CUSTOM_API}/teams`, { headers: this.header });
  }

  getMatches(teamId: number, dates: string[]):Observable<MatchesApiResponse> {
    let param = new HttpParams()
      .append('per_page', 100)
      .append('team_ids[]', teamId)

    dates.forEach((date: string) => {
      param = param.append('dates[]', date)
    });

    return this.http.get<MatchesApiResponse>(`${this.CUSTOM_API}/games`, { headers: this.header, params: param });
  }
}

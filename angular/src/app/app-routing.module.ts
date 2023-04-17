import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './components/teams/teams.component';
import { MatchResultsComponent } from './components/match-results/match-results.component';

const routes: Routes = [
  { path: '', component: TeamsComponent },
  { path: 'results/:teamCode', component: MatchResultsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

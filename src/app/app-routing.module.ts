
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CoachAgentApplicationComponent } from './pages/coach-agent-application/coach-agent-application.component';
import { CoachesTermsAndConditionsComponent } from './pages/coaches-terms-and-conditions/coaches-terms-and-conditions.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './pages/footer/footer.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayersTermsAndConditionsComponent } from './pages/players-terms-and-conditions/players-terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
// import { IgniteSoccerStarMaleComponent } from './competition/ignite-soccer-star-male/ignite-soccer-star-male.component';

import { AboutComponent as FemaleCompetitionAbout } from './pages/competition/female/about/about.component';
import { AboutComponent as MaleCompetitionAbout } from './pages/competition/male/about/about.component';
import { FixturesComponent as FemaleCompetitionFixtures } from './pages/competition/female/fixtures/fixtures.component';
import { FixturesComponent as MaleCompetitionFixtures } from './pages/competition/male/fixtures/fixtures.component';
import { HighlightsComponent as FemaleCompetitionHighlights } from './pages/competition/female/highlights/highlights.component';
import { HighlightsComponent as MaleCompetitionHighlights } from './pages/competition/male/highlights/highlights.component';
import { PlayersComponent as FemaleCompetitionPlayers } from './pages/competition/female/players/players.component';
import { PlayersComponent as MaleCompetitionPlayers } from './pages/competition/male/players/players.component';
import { RegisterComponent as FemaleCompetitionRegister } from './pages/competition/female/register/register.component';
import { RegisterComponent as MaleCompetitionRegister } from './pages/competition/male/register/register.component';
import { PostLagosEndorseIgniteComponent } from './pages/blog/post-lagos-endorse-ignite/post-lagos-endorse-ignite.component';
import { PostGovernorVisitsVeniaBusinessHubComponent } from './pages/blog/post-governor-visits-venia-business-hub/post-governor-visits-venia-business-hub.component';
import { PostIgniteTeamVisitsRadianceFootballClubComponent } from './pages/blog/post-ignite-team-visits-radiance-football-club/post-ignite-team-visits-radiance-football-club.component';
import { PostFirstOfItsKindComponent } from './pages/blog/post-first-of-its-kind/post-first-of-its-kind.component';
import { PostNextTopComponent } from './pages/blog/post-next-top/post-next-top.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'whats-hot', component: BlogComponent },
  { path: 'coach-agent-application', component: CoachAgentApplicationComponent },
  { path: 'coaches-terms-and-conditions', component: CoachesTermsAndConditionsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'players-terms-and-conditions', component: PlayersTermsAndConditionsComponent },
  { path: 'competition/female', component: FemaleCompetitionAbout },
  { path: 'competition/female/fixtures', component: FemaleCompetitionFixtures },
  { path: 'competition/female/highlights', component: FemaleCompetitionHighlights },
  { path: 'competition/female/players', component: FemaleCompetitionPlayers },
  { path: 'competition/female/register', component: FemaleCompetitionRegister },
  { path: 'competition/male', component: MaleCompetitionAbout },
  { path: 'competition/male/fixtures', component: MaleCompetitionFixtures },
  { path: 'competition/male/highlights', component: MaleCompetitionHighlights },
  { path: 'competition/male/players', component: MaleCompetitionPlayers },
  { path: 'competition/male/register', component: MaleCompetitionRegister },
  { path: 'blog/post/lagos-endorse', component: PostLagosEndorseIgniteComponent },
  { path: 'blog/post/govornor-visits', component: PostGovernorVisitsVeniaBusinessHubComponent },
  { path: 'blog/post/ignite-team', component: PostIgniteTeamVisitsRadianceFootballClubComponent },
  { path: 'blog/post/first-of-its-kind', component: PostFirstOfItsKindComponent },
  { path: 'blog/post/post-next-top', component: PostNextTopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

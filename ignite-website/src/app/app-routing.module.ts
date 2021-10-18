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
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

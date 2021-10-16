import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { CoachAgentApplicationComponent } from './coach-agent-application/coach-agent-application.component';
import { CoachesTermsAndConditionsComponent } from './coaches-terms-and-conditions/coaches-terms-and-conditions.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { PlayersTermsAndConditionsComponent } from './players-terms-and-conditions/players-terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

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


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CoachAgentApplicationComponent } from './coach-agent-application/coach-agent-application.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { CoachesTermsAndConditionsComponent } from './coaches-terms-and-conditions/coaches-terms-and-conditions.component';
import { PlayersTermsAndConditionsComponent } from './players-terms-and-conditions/players-terms-and-conditions.component';
import { IgniteSoccerStarMaleComponent } from './competition/ignite-soccer-star-male/ignite-soccer-star-male.component';
import { IgniteSoccerStarFemaleComponent } from './competition/ignite-soccer-star-female/ignite-soccer-star-female.component';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    GalleryComponent,
    PrivacyPolicyComponent,
    CoachAgentApplicationComponent,
    TermsOfUseComponent,
    CoachesTermsAndConditionsComponent,
    PlayersTermsAndConditionsComponent,

    HomeComponent,
    AboutComponent,
    GalleryComponent,
    ContactComponent,
    BlogComponent,
    IgniteSoccerStarMaleComponent,
    IgniteSoccerStarFemaleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule
  ],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

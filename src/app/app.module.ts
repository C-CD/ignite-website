import { TopLoaderComponent } from './components/top-loader/top-loader.component';
import { FemaleModule } from './pages/competition/female/female.module';
import { MaleModule } from './pages/competition/male/male.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TermsOfUseComponent } from './pages/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { NavComponent } from './pages/nav/nav.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CoachAgentApplicationComponent } from './pages/coach-agent-application/coach-agent-application.component';
import { CoachesTermsAndConditionsComponent } from './pages/coaches-terms-and-conditions/coaches-terms-and-conditions.component';
import { PlayersTermsAndConditionsComponent } from './pages/players-terms-and-conditions/players-terms-and-conditions.component';
import { AngularFireModule } from '@angular/fire';
import { firebase_configuration } from '../environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxFormValidationsModule } from 'ngx-form-validations';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgniteSoccerStarMaleComponent } from './competition/ignite-soccer-star-male/ignite-soccer-star-male.component';
import { IgniteSoccerStarFemaleComponent } from './competition/ignite-soccer-star-female/ignite-soccer-star-female.component';
import { PostLagosEndorseIgniteComponent } from './pages/blog/post-lagos-endorse-ignite/post-lagos-endorse-ignite.component';
import { PostGovernorVisitsVeniaBusinessHubComponent } from './pages/blog/post-governor-visits-venia-business-hub/post-governor-visits-venia-business-hub.component';
import { PostIgniteTeamVisitsRadianceFootballClubComponent } from './pages/blog/post-ignite-team-visits-radiance-football-club/post-ignite-team-visits-radiance-football-club.component';
import { PostFirstOfItsKindComponent } from './pages/blog/post-first-of-its-kind/post-first-of-its-kind.component';
import { CustomNotificationComponent } from './components/custom-notification/custom-notification.component';

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
    PostLagosEndorseIgniteComponent,
    PostGovernorVisitsVeniaBusinessHubComponent,
    PostIgniteTeamVisitsRadianceFootballClubComponent,
    PostFirstOfItsKindComponent,
    CustomNotificationComponent,
    TopLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebase_configuration),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgxFormValidationsModule,
    MaleModule,
    FemaleModule
  ],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

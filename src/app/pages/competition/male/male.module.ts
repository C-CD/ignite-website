import { MatchStandingsComponent } from './../../../components/match-standings/match-standings.component';
import { MaleCompetitionNavComponent } from './../../../components/navs/male-competition-nav/male-competition-nav.component';
import { FixturesModalComponent } from './../../../components/fixtures-modal/fixtures-modal.component';
import { HighlightsComponent } from './highlights/highlights.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about/about.component';
import { PlayersComponent } from './players/players.component';
import { RegisterComponent } from './register/register.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PlayerModalComponent } from 'src/app/components/player-modal/player-modal.component';
import { VoteModalComponent } from 'src/app/components/vote-modal/vote-modal.component';
import { NgxFormValidationsModule } from 'ngx-form-validations';
import { PointIndicatorComponent } from 'src/app/components/point-indicator/point-indicator.component';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { ClipboardModule } from 'ngx-clipboard';
import { PlayerRegisterationModule } from 'src/app/components/player-registeration/player-registeration.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PlayersComponent,
    RegisterComponent,
    FixturesComponent,
    AboutComponent,
    HighlightsComponent,
    PlayerModalComponent,
    VoteModalComponent,
    FixturesModalComponent,
    MaleCompetitionNavComponent,
    PointIndicatorComponent,
    MatchStandingsComponent,
  ],
  exports: [
    PlayersComponent,
    RegisterComponent,
    FixturesComponent,
    AboutComponent,
    HighlightsComponent,
    PlayerModalComponent,
    VoteModalComponent,
    FixturesModalComponent,
    MaleCompetitionNavComponent,
    PointIndicatorComponent,
    MatchStandingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxFormValidationsModule,
    ClipboardModule,
    InternationalPhoneNumberModule,
    PlayerRegisterationModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class MaleModule { }

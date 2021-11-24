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


@NgModule({
  declarations: [
    PlayersComponent,
    RegisterComponent,
    FixturesComponent,
    AboutComponent,
    HighlightsComponent,
    PlayerModalComponent,
    VoteModalComponent,
    FixturesModalComponent
  ],
  exports: [
    PlayersComponent,
    RegisterComponent,
    FixturesComponent,
    AboutComponent,
    HighlightsComponent,
    PlayerModalComponent,
    VoteModalComponent,
    FixturesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxFormValidationsModule
  ]
})
export class MaleModule { }

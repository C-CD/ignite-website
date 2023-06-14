import { FemaleCompetitionNavComponent } from './../../../components/navs/female-competition-nav/female-competition-nav.component';
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
import { PlayerRegisterationComponent } from 'src/app/components/player-registeration/player-registeration.component';
import { PlayerRegisterationModule } from 'src/app/components/player-registeration/player-registeration.module';
import { SharedModule} from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PlayersComponent,
    RegisterComponent,
    FixturesComponent,
    AboutComponent,
    HighlightsComponent,
    FemaleCompetitionNavComponent
  ],
  exports:[
    PlayersComponent,
    RegisterComponent,
    FixturesComponent,
    AboutComponent,
    HighlightsComponent,
    FemaleCompetitionNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    PlayerRegisterationModule,
    SharedModule
  ]
})
export class FemaleModule { }

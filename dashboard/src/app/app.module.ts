import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
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
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { PlayersComponent } from './pages/players/players.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomNotificationComponent } from './components/custom-notification/custom-notification.component';
import { TopLoaderComponent } from './components/top-loader/top-loader.component';
// import { DataTablesModule } from 'angular-datatables';
import { SetupComponent } from './pages/setup/setup.component';
import { VotingsComponent } from './pages/votings/votings.component';
import { AddPlayersComponent } from './pages/add-players/add-players.component';
import { AddTeamsComponent } from './pages/add-teams/add-teams.component';
import { MaleTeamsComponent } from './pages/male-teams/male-teams.component';
import { FemaleTeamsComponent } from './pages/female-teams/female-teams.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { MalePlayersComponent } from './pages/male-players/male-players.component';
import { FemalePlayersComponent } from './pages/female-players/female-players.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    PlayersComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    CustomNotificationComponent,
    TopLoaderComponent,
    SetupComponent,
    VotingsComponent,
    AddPlayersComponent,
    AddTeamsComponent,
    MaleTeamsComponent,
    FemaleTeamsComponent,
    TeamsComponent,
    MalePlayersComponent,
    FemalePlayersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgxFormValidationsModule,
    // DataTablesModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

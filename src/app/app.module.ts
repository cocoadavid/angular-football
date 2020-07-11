import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from './components/matches/matches.component';
import { MatchDetailsComponent } from './components/match-details/match-details.component';
import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';
import { ProgressBarComponent } from './components/shared/progress-bar/progress-bar.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, MatchesComponent, MatchDetailsComponent, BreadcrumbComponent, ProgressBarComponent, SpinnerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SightingComponent } from './sighting/sighting.component';
import { DuckFilterPipe } from './pipes/duck-filter.pipe';
import {Routes, RouterModule} from "@angular/router";

const appRoutes: Routes = [
    {
        path: 'sightings',
        component: SightingComponent
    }
  ];

@NgModule({
  declarations: [
    AppComponent,
    SightingComponent,
    DuckFilterPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

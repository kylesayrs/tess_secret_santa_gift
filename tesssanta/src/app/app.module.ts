import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { PlayComponent } from './play/play.component';

import { CountdownModule } from 'ngx-countdown';
import { CountdownGlobalConfig } from 'ngx-countdown';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HowComponent } from './how/how.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    PlayComponent,
    HowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CountdownModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ {provide: CountdownGlobalConfig} ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { StationComponent } from './station/station.component';

import { GoogleMapsComponent } from './google-maps/google-maps.component';

import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [AppComponent,StationComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,
  AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDaYQRdZCQAhvwSuwZohDjfOY3HHdGXc4M'
    }),
    AgmDirectionModule
],
providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

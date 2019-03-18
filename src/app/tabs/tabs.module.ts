import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { GoogleMapsComponent } from '../google-maps/google-maps.component';
@NgModule({
  imports: [
  IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDaYQRdZCQAhvwSuwZohDjfOY3HHdGXc4M'
    }),
    AgmDirectionModule
  ],
  declarations: [GoogleMapsComponent, TabsPage]
})
export class TabsPageModule {}

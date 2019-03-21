import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';
@NgModule({
  imports: [
IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDaYQRdZCQAhvwSuwZohDjfOY3HHdGXc4M'
    }),
    AgmDirectionModule
  ],
  declarations: [Tab2Page,GoogleMapsComponent]
})
export class Tab2PageModule {}

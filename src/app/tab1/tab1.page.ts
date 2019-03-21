import { Component } from '@angular/core';
import { BartStationsServiceService } from './bart-stations-service.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private service: BartStationsServiceService, private router: Router,private menu: MenuController){}
  stnArray = [];
  isLoader: Boolean;
  ngOnInit(){
    this.isLoader = true;
    this.service.getBartStations().subscribe(data => {
      let stationsArray = data.root.stations.station;
      this.stnArray = stationsArray;
      this.isLoader = false;
    })
  }

  ionViewWillEnter() {
    setTimeout(() => {
     
    }, 5000);
  }

  getStation(val){
    console.log(val);
    this.service.setStationName(val);
    this.router.navigate(['/station']);
  }
  doRefresh(event) {
    this.isLoader = true;
    this.service.getBartStations().subscribe(data => {
      let stationsArray = data.root.stations.station;
      this.stnArray = stationsArray;
      this.isLoader = false;
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  
}

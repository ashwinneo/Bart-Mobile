import { Component } from '@angular/core';
import { BartStationsServiceService } from './bart-stations-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private service: BartStationsServiceService, private router: Router){}
  stnArray = [];
  ngOnInit(){
    this.service.getBartStations().subscribe(data => {
      let stationsArray = data.root.stations.station;
      this.stnArray = stationsArray;
    })
  }

  getStation(val){
    console.log(val);
    this.service.setStationName(val);
    this.router.navigate(['/station']);
  }
}

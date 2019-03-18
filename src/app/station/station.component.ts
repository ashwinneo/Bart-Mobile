import { Component, OnInit } from '@angular/core';
import { BartStationsServiceService } from '../tab1/bart-stations-service.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit {

  constructor(private service: BartStationsServiceService) { }
  station = [];
  food: String = "";
  shopping: String = "";
  ngOnInit() {
    let station = this.service.getStationName();
    console.log(station);
    this.service.getBartStation(station).subscribe(data => {
      this.station.push(data.root.stations.station);
      console.log(this.station);
      //FOOD LINK
      let food = data.root.stations.station.food['#cdata-section'];
      let foodLink = [];
      let foodLink1 = [];
      let foodLink2 = [];
      foodLink = food.split("http");
      foodLink1 = foodLink[1].split("\"\"");
      foodLink2 = foodLink1[0].split(">");
      let foodlink = "http" + foodLink2[0];
      let foodurl = foodlink.split("\"");
      this.food = foodurl[0];
      console.log(this.food);
      //FOOD LINK
      //TRAVEL LINK
      let shopping = data.root.stations.station.shopping['#cdata-section'];
      let shoppingLink = [];
      let shoppingLink1 = [];
      let shoppingLink2 = [];
      shoppingLink = shopping.split("http");
      shoppingLink1 = shoppingLink[1].split("\"\"");
      shoppingLink2 = shoppingLink1[0].split(">");
      let shoppingLink3 = "http" + shoppingLink2[0];
      let shoppingUrl = shoppingLink3.split("\"");
      this.shopping = shoppingUrl[0];
      console.log(this.shopping);
      //TRAVEL LINK
    })
  }

}

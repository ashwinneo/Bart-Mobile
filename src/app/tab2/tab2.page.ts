import { Component } from '@angular/core';
import { BartStationsServiceService } from '../tab1/bart-stations-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private service: BartStationsServiceService) {
  }
  stations = [];
  source: String = "";
  destination: String = "";
  isDisabled: Boolean;
  isbtnDisabled: Boolean;
  isError: Boolean;
  showMap: Boolean;
  mapArray = [];
  scheduleArray = [];
  scheduleArray1 = [];
  isLoader: Boolean;
  ngOnInit(){
    this.isLoader = true;
    this.isDisabled = true;
    this.isbtnDisabled = true;
    this.showMap = false;
    this.service.getBartStations().subscribe(data => {
      console.log(data);
      this.isLoader = false;
      this.stations = data.root.stations.station;
    })
  }
  
  selectSource(val) {
    this.source = val;
    this.isDisabled = false;
    this.showMap = false;
    this.scheduleArray1 = [];
    if(this.source == this.destination) {
      this.isbtnDisabled = true;
      this.isError = true;
    }else{
      this.isbtnDisabled = false;
      this.isError = false;
    }
    if(this.destination == null || this.destination == "") {
      this.isbtnDisabled = true;
    }
    this.service.getBartStation(this.source).subscribe(data => {
      //this.spinner.hide();
      if(this.mapArray.length == 0) {
        let myObj = {
          "lat": Number(data.root.stations.station.gtfs_latitude),
          "lng": Number(data.root.stations.station.gtfs_longitude)
        }
        this.mapArray.push(myObj);
      }else {
        this.mapArray[0]["lat"]= Number(data.root.stations.station.gtfs_latitude);
        this.mapArray[0]["lng"] = Number(data.root.stations.station.gtfs_longitude);
      }
      console.log(this.mapArray);
    })
  }
  selectDestination(val) {
    this.destination = val;
    this.showMap = false;
    this.scheduleArray1 = [];
    if(this.source == this.destination) {
      this.isbtnDisabled = true;
      this.isError = true;
    }else{
      this.isbtnDisabled = false;
      this.isError = false;
    }
    this.service.getBartStation(this.destination).subscribe(data => {
      //this.spinner.hide();
      if(this.mapArray.length == 1) {
        let myObj = {
          "lat": Number(data.root.stations.station.gtfs_latitude),
          "lng": Number(data.root.stations.station.gtfs_longitude)
        }
        this.mapArray.push(myObj);
      }else {
        this.mapArray[1]["lat"]= Number(data.root.stations.station.gtfs_latitude);
        this.mapArray[1]["lng"] = Number(data.root.stations.station.gtfs_longitude);
      }
      console.log(this.mapArray);
    })
  }

  getTrips(){
    this.isLoader = true;
    this.scheduleArray1 = [];
    this.showMap = true;
      this.service.getTrips(this.source, this.destination).subscribe(data => {
        console.log(data);
        //this.spinner.hide();
        this.isLoader = false;
        this.scheduleArray = data.root.schedule.request.trip;
        console.log(this.scheduleArray);
        let date = new Date();
        console.log(date);
        let h = date.getHours()% 12 || 12;
        let m = date.getMinutes();
        let seconds = h * 60 * 60 + m * 60;
        let time: String  = data.root.schedule.request.trip[0]["@origTimeMin"];
        let split: any = time.split(" ");
        let timeSplit: String = split[0].trim();
        let time1:any = timeSplit.split(":");
        let hours = time1[0].trim();
        let min = time1[1].trim();
        let timeLeft =  (hours * 60 * 60 + min * 60) - (seconds);
        if(timeLeft < 0) {
          timeLeft = -(timeLeft);
        }
        // this.nextTrain = {
        //   "leftTime" : timeLeft
        // }
        // this.isTimeLeft = true;
        // setTimeout(() => {
        //   this.isTimeLeft = false;
        // }, 30000);
        for(let i=0; i< this.scheduleArray.length; i++) {
          // var now = moment().format('LT');
          // var nowTime = moment(now, "HH:mm a");
          // var source = data.root.schedule.request.trip[i]["@origTimeMin"];
          // var sourceTime = moment(source, "HH:mm a");
          // // var startTime = moment('03:31am', "HH:mm a");
          // // var endTime = moment('03:30am', "HH:mm a");
          // if (nowTime.isAfter(sourceTime)){
          //   console.log(true);
          // }
          let myObj = {
            "source" : data.root.schedule.request.trip[i]["@origin"],
            "destination" : data.root.schedule.request.trip[i]["@destination"],
            "departTime" : data.root.schedule.request.trip[i]["@origTimeMin"],
            "arrivalTime" : data.root.schedule.request.trip[i]["@destTimeMin"],
            "fare" : data.root.schedule.request.trip[i]["@fare"]
          }
          this.scheduleArray1.push(myObj);
        }
        console.log(this.scheduleArray1);
    })
  }

  doRefresh(event) {
    this.isLoader = true;
    this.service.getBartStations().subscribe(data => {
      console.log(data);
      this.isLoader = false;
      this.stations = data.root.stations.station;
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
}

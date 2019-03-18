import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BartStationsServiceService {

  constructor(private http: HttpClient) { }
  station: String = "";
  getBartStations(): Observable<any> {
    let url = 'http://54.183.199.109/Media_Upload/stations';
    return this.http.get(url);
  }

  getBartStation(val): Observable<any> {
    let url1 = 'http://54.183.199.109/Media_Upload/station?origin=' + val;
    return this.http.get(url1);
  }

  setStationName(station){
    this.station = station
  }
  getStationName(){
    return this.station;
  }
  
  getTrips(source, destination): Observable<any> {
    let url2 = 'http://54.183.199.109/Media_Upload/trips?source=' + source + "&destination=" + destination;
    return this.http.get(url2);
  } 
}

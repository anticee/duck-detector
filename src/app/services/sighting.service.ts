import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Subject, Observable} from "rxjs";
import {Sighting} from "../interfaces/sighting";
import {Species} from "../interfaces/species";

@Injectable()
export class SightingService {
  private sightings = new Subject<Sighting[]>();
  private _sightings: Sighting[];
  private species = new Subject<Species[]>();
  private _species: Species[];
  private urlSightings = 'api/sightings';
  private urlSpecies= 'api/species';

  constructor(private http: Http) { }

  refreshSightings() {
    return this.http.get(this.urlSightings)
      .map(response => response.json())
      .do(response => {
        console.log(response);
        response.forEach(resp => resp.dateTime = new Date(resp.dateTime).toLocaleString() );
        response.forEach(resp => resp.confirmations = 1);
        this._sightings = response;
        this.sightings.next(this._sightings);
      });
  }

  refreshSpecies() {
    return this.http.get(this.urlSpecies)
      .map(response => response.json())
      .do(response => {
        this._species = response;
        this.species.next(this._species);
      });
  }

  getAllSightings(): Observable<Sighting[]> {
    this.refreshSightings().subscribe();
    return this.sightings;
  }

  getAllSpecies(): Observable<Species[]> {
    this.refreshSpecies().subscribe();
    return this.species;
  }


  create(sighting: Sighting): Observable<Sighting[]> {
    let body = JSON.stringify({ species: sighting.species, description: sighting.description,
      dateTime: sighting.dateTime, count: sighting.count});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlSightings, body, options)
      .map(response => response.json())
      .catch(error => error.json())
      .do(response => {
        this._sightings.push(sighting);
        this.sightings.next(this._sightings);
      });
  }

}

import {Component, OnInit, Input} from '@angular/core';
import {SightingService} from "../services/sighting.service";
import {Sighting} from "../interfaces/sighting";
import {Species} from "../interfaces/species";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-sighting',
  templateUrl: './sighting.component.html',
  styleUrls: ['sighting.component.scss'],
  providers: [SightingService]
})
export class SightingComponent implements OnInit {
  @Input() sightings: Sighting[];
  @Input() species: Species[];
  public sightingForm = this.fb.group({
    species: "",
    count: "",
    description: ""
  });
  private results: number = 4;
  private switchHeight = [];
  private order: string = "";

  constructor(private sightingService: SightingService, public fb: FormBuilder) {
  }

  ngOnInit() {
    this.sightingService.getAllSightings().subscribe(data => this.sightings = data);
    this.sightingService.refreshSightings();
    this.sightingService.getAllSpecies().subscribe(data => this.species = data);
    this.sightingService.refreshSpecies();
  }

  onSubmit(event) {
    console.log(event);
    console.log(this.sightingForm.value);
  }

  getHeight(index) {
    if(this.switchHeight[index])
      return "auto";
    else {
      return "95px";
    }
  }

  addConfirmation(id) {
    this.sightings.find(data => data.id === id).confirmations += 1;
  }

  removeSighting(id) {
    console.log("remove", id);
  }

  addSighting(data) {
    let tmp: Sighting = data;
    tmp.dateTime = new Date().toLocaleString();
    console.log(tmp, this.sightings);
    this.sightingService.create(tmp).subscribe();
  }

  sortSightings(order) {
    console.log(this.sightings);
    this.order = order;

    if(!this.sightings)
      return null;

    this.sightings.sort((a, b) => {
      if (new Date(a.dateTime) < new Date(b.dateTime)) {
        if(this.order === 'asc')
          return -1;
        else
          return 1;
      } else if (new Date(a.dateTime) > new Date(b.dateTime)) {
        if(this.order === 'asc')
          return 1;
        else
          return -1;
      } else {
        return 0;
      }
    });
  }

}

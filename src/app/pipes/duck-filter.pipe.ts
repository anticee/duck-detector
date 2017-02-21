import { Pipe, PipeTransform } from '@angular/core';
import {Sighting} from "../interfaces/sighting";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'duckFilter'
})
export class DuckFilterPipe implements PipeTransform {

  transform(sightings: Sighting[], args: string): any {
    if(sightings == null)
      return null;
    else if(!args)
      return sightings;
    else
      return sightings.filter(sighting => sighting.species.toLowerCase().includes(args));
  }

}

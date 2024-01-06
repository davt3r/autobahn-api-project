// road-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AutobahnApiService } from '../../services/api.service';
import { Road } from '../../models/road.model';
import { SharedService } from '../../helpers/shared.service';

@Component({
  selector: 'app-road-list',
  templateUrl: './road-list.component.html',
  styleUrls: ['./road-list.component.css'],
})
export class RoadListComponent implements OnInit {
  roads: Road[] = [];

  constructor(private autobahnApiService: AutobahnApiService, private sharedService: SharedService) {}

  ngOnInit(): void {
    // Fetch road IDs from Autobahn API and initialize roads array
    this.autobahnApiService.getRoads().subscribe(
      (data: { roads: string[] }) => {
        // Create Road objects for each road ID
        this.roads = data.roads.map((roadId) => ({
          roadId,
          roadworks: [],  
          webcams: [],    
          parkingLorries: [],
          warnings: [],
          closures: [],
          electricChargingStations: [],
          roadworksCount: 0,
          webcamsCount: 0,
          parkingLorriesCount:0,
          warningsCount:0,
          closuresCount:0,
          electricChargingStationsCount:0,
          coordinates:[]
        }));
  // Load additional road properties using shared service
        this.loadRoadProperties();
      },
      (error) => {
        console.error('Error al obtener la lista de carreteras', error);
      }
    );
  }
// Load additional road properties asynchronously using shared service
  async loadRoadProperties(): Promise<void> {
    await Promise.all(this.roads.map(async (road) => {
       // Load roadworks, webcams, lorries, warnings, closures, and electric charging stations data
      await this.sharedService.loadRoadworks(road);
      await this.sharedService.loadWebcams(road);
      await this.sharedService.loadLorries(road);
      await this.sharedService.loadWarnings(road);
      await this.sharedService.loadClosures(road);
      await this.sharedService.loadElectricChargingStations(road);
    }));
  }
}

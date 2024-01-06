// shared.service.ts

import { Injectable } from '@angular/core';
import { Road } from '../models/road.model';
import { Roadwork } from '../models/roadwork.model';
import { AutobahnApiService } from '../services/api.service';
import { ParkingLorry } from '../models/parkingLorry.model';
import { Webcam } from '../models/webcam.model';
import { Warning } from '../models/warning.model';
import { Closure } from '../models/closure.module';
import { ElectricChargingStation } from '../models/chargingStation.module';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private autobahnApiService: AutobahnApiService) {}

  // Load roadworks data for a road
  async loadRoadworks(road: Road): Promise<void> {
    try {
      // Fetch roadworks data from Autobahn API and update road properties
      const data = await this.autobahnApiService.getPropertyForRoad<{ roadworks: Roadwork[] }>(road.roadId, 'roadworks').toPromise();
      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].roadworks)) {
        road.roadworksCount = data[0].roadworks.length;
      } else {
        console.error('Invalid array response for roadworks:', data);
      }
    } catch (error) {
      console.error('Error fetching roadworks for road', road.roadId, error);
    }
  }

  // Load parking lorries data for a road
  async loadLorries(road: Road): Promise<void> {
    try {
      // Fetch parking lorries data from Autobahn API and update road properties
      const data = await this.autobahnApiService.getPropertyForRoad<{ parking_lorry: ParkingLorry[] }>(road.roadId, 'parking_lorry').toPromise();
      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].parking_lorry)) {
        road.parkingLorriesCount = data[0].parking_lorry.length;
      } else {
        console.error('Invalid array response for parking_lorry:', data);
      }
    } catch (error) {
      console.error('Error fetching parking_lorry for road', road.roadId, error);
    }
  }

  // Load webcams data for a road
  async loadWebcams(road: Road): Promise<void> {
    try {
      // Fetch webcams data from Autobahn API and update road properties
      const data = await this.autobahnApiService.getPropertyForRoad<{ webcam: Webcam[] }>(road.roadId, 'webcam').toPromise();

      if (Array.isArray(data) && data.length > 0 && 'webcam' in data[0] && Array.isArray(data[0].webcam)) {
        road.webcamsCount = data[0].webcam.length;
        road.webcams = data[0].webcam;
      } else {
        console.error('Invalid array response for webcams:', data);
      }
    } catch (error) {
      console.error('Error fetching webcams for road', road.roadId, error);
    }
  }

  // Load warnings data for a road
  async loadWarnings(road: Road): Promise<void> {
    try {
      // Fetch warnings data from Autobahn API and update road properties
      const data = await this.autobahnApiService.getPropertyForRoad<{ warning: Warning[] }>(road.roadId, 'warning').toPromise();

      if (Array.isArray(data) && data.length > 0 && 'warning' in data[0] && Array.isArray(data[0].warning)) {
        road.warningsCount = data[0].warning.length;
        road.warnings = data[0].warning;
      } else {
        console.error('Invalid array response for warnings:', data);
      }
    } catch (error) {
      console.error('Error fetching warnings for road', road.roadId, error);
    }
  }

  // Load closures data for a road
  async loadClosures(road: Road): Promise<void> {
    try {
      // Fetch closures data from Autobahn API and update road properties
      const data = await this.autobahnApiService.getPropertyForRoad<{ closure: Closure[] }>(road.roadId, 'closure').toPromise();

      if (Array.isArray(data) && data.length > 0 && 'closure' in data[0] && Array.isArray(data[0].closure)) {
        road.closuresCount = data[0].closure.length;
        road.closures = data[0].closure;
      } else {
        console.error('Invalid array response for closures:', data);
      }
    } catch (error) {
      console.error('Error fetching closures for road', road.roadId, error);
    }
  }

  // Load electric charging stations data for a road
  async loadElectricChargingStations(road: Road): Promise<void> {
    try {
      // Fetch electric charging stations data from Autobahn API and update road properties
      const data = await this.autobahnApiService.getPropertyForRoad<{ electric_charging_station: ElectricChargingStation[] }>(road.roadId, 'electric_charging_station').toPromise();

      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].electric_charging_station)) {
        road.electricChargingStationsCount = data[0].electric_charging_station.length;
      } else {
        console.error('Invalid array response for electric_charging_station:', data);
      }
    } catch (error) {
      console.error('Error fetching electric charging for road', road.roadId, error);
    }
  }
}

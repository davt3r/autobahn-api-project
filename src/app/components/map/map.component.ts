// map.component.ts
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Roadworks } from '../../models/roadwork.model';
import { Road } from '../../models/road.model';
import { AutobahnApiService } from '../../services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: L.Map | null = null;
  roads: Road[] = [];

  constructor(private autobahnApiService: AutobahnApiService) { }

  ngOnInit(): void {
    this.autobahnApiService.getRoads().subscribe(
      (data: { roads: string[] }) => {
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
          parkingLorriesCount: 0,
          warningsCount: 0,
          closuresCount: 0,
          electricChargingStationsCount: 0,
          coordinates: []
        }));
// Load roadworks data and initialize the map
        this.loadRoadworksData();
        this.initMap();
      },
      (error) => {
        console.error('Error al obtener la lista de carreteras', error);
      }
    );
  }
  // Initialize the Leaflet map
  initMap(): void {
    const center = L.latLng(51.1657, 10.4515);

    this.map = L.map('leafletMap', {
      center,
      zoom: 6,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        })
      ]
    });
   // Add roadworks markers to the map for each road
    this.roads.forEach((road) => {
      this.addRoadworksMarkers(road);
    });
  }
// Fetch roadworks data for each road
  loadRoadworksData(): void {
    this.roads.forEach((road) => {
      this.autobahnApiService.getRoadworks(road.roadId).subscribe(
        (data) => {
          road.roadworks = data;
          road.roadworksCount = data.length;
           // Render pop-ups for roadworks on the map
          this.renderPopups(road);
        },
        (error) => {
          console.error('Error al cargar datos de roadworks para la carretera', road.roadId, error);
        }
      );
    });
  }

 // Add roadworks markers to the map for a specific road
  addRoadworksMarkers(road: Road): void {
    road.roadworks.forEach((roadwork: any) => {
      if (roadwork.coordinate) {
        const coordinates = L.latLng(Number(roadwork.coordinate.lat), Number(roadwork.coordinate.long));
        const marker = L.marker(coordinates).addTo(this.map!).bindPopup('Pop-up cerrado. Haz clic para abrir.');
    
        marker.on('click', () => {
          marker.setPopupContent(this.getPopupContent(roadwork));
          marker.openPopup();
        });
      }
    });
  }
// Generate HTML content for a roadwork pop-up
  getPopupContent(roadwork: Roadworks): string {
    const popupContent = `
      <strong>Roadwork:</strong> ${roadwork.title}<br>
      <strong>Description:</strong> ${roadwork.description.join(', ')}<br>
      <strong>Start:</strong> ${roadwork.startTimestamp}<br>
    `;
    return popupContent;
  }
 // Render pop-ups for roadworks on the map for a specific road
  renderPopups(road: Road): void {
    road.roadworks.forEach((roadwork: any) => {
      if (roadwork.coordinate) {
        const coordinates = L.latLng(Number(roadwork.coordinate.lat), Number(roadwork.coordinate.long));

        const popupContent = this.getPopupContent(roadwork);

        const marker = L.marker(coordinates).addTo(this.map!).bindPopup('Pop-up cerrado. Haz clic para abrir.');
        
        marker.on('click', () => {
          marker.setPopupContent(popupContent);
          marker.openPopup();
        });
      }
    });
  }
}

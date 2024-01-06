// autobahn-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Roadwork } from '../models/roadwork.model';
import { Webcam } from '../models/webcam.model';
import { ParkingLorry } from '../models/parkingLorry.model';
import { Warning } from '../models/warning.model';
import { Closure } from '../models/closure.module';
import { ElectricChargingStation } from '../models/chargingStation.module';
import { handleApiError } from '../error/api-error-handler';

@Injectable({
  providedIn: 'root',
})
export class AutobahnApiService {
  private baseUrl = 'https://verkehr.autobahn.de/o/autobahn';

  constructor(private http: HttpClient) {}

  getRoads(): Observable<{ roads: string[] }> {
    return this.http.get<{ roads: string[] }>(`${this.baseUrl}`);
  }



  getPropertyForRoad<T>(roadId: string, property: string): Observable<T[]> {
    const url = `${this.baseUrl}/${roadId}/services/${property}`;
    return this.http.get<T | T[]>(url).pipe(
      map((data: T | T[]) => {
        return Array.isArray(data) ? data : [data];
      }),
      catchError(handleApiError)
    );
  }
  
  getRoadworks(roadId: string): Observable<Roadwork[]> {
    return this.http.get<{ roadworks: Roadwork[] }>(`${this.baseUrl}/${roadId}/services/roadworks`)
      .pipe(
        map(data => data.roadworks),
        catchError(handleApiError)
      );
  }


  // Obtener detalles de una obra vial específica


  // Obtener lista de cámaras web disponibles para una carretera específica
  getWebcams(roadId: string): Observable<Webcam[]> {
    return this.http.get<Webcam[]>(`${this.baseUrl}/${roadId}/services/webcam`);
  }


  // Obtener lista de áreas de descanso disponibles para una carretera específica
  getParkingLorries(roadId: string): Observable<ParkingLorry[]> {
    return this.http.get<ParkingLorry[]>(`${this.baseUrl}/${roadId}/services/parking_lorry`);
  }


  // Obtener lista de informes de tráfico para una carretera específica
  getTrafficWarnings(roadId: string): Observable<Warning[]> {
    return this.http.get<Warning[]>(`${this.baseUrl}/${roadId}/services/warning`);
  }


  // Obtener lista de suspensiones para una carretera específica
  getRoadClosures(roadId: string): Observable<Closure[]> {
    return this.http.get<Closure[]>(`${this.baseUrl}/${roadId}/services/closure`);
  }



  // Obtener lista de estaciones de carga eléctrica para una carretera específica
  getChargingStations(roadId: string): Observable<ElectricChargingStation[]> {
    return this.http.get<ElectricChargingStation[]>(`${this.baseUrl}/${roadId}/services/electric_charging_station`);
  }


}

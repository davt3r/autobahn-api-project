// road.model.ts
import { ElectricChargingStation } from "./chargingStation.module";
import { Closure } from "./closure.module";
import { ParkingLorry } from "./parkingLorry.model";
import { Roadwork } from "./roadwork.model";
import { Warning } from "./warning.model";
import { Webcam } from "./webcam.model";
import { Coordinate } from "./coordinate.model";

export class Road {
  constructor(
    public roadId: string,
    public roadworks: Roadwork[],
    public webcams: Webcam[],
    public parkingLorries: ParkingLorry[],
    public warnings: Warning[],
    public closures: Closure[],
    public electricChargingStations: ElectricChargingStation[],
    public roadworksCount: number,
    public webcamsCount: number,
    public parkingLorriesCount: number,
    public warningsCount: number,
    public closuresCount: number,
    public electricChargingStationsCount: number,
    public coordinates: Coordinate[],
  ) {}
}

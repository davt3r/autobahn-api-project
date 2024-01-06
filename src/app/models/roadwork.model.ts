// roadwork.model.ts
import { Coordinate } from "./coordinate.model";

export interface Roadwork {
  roadworks: RoadworkItem[];
}

interface RoadworkItem {
  coordinate: Coordinate;
}

export interface Roadworks {
  coordinate: Coordinate;
  description: string[];
  endTimestamp: string;
  display_type: string;
  extent: string;
  footer: string[]; 
  future: boolean;
  icon: string;
  identifier: string;
  isBlocked: string;
  lorryParkingFeatureIcons: string[]; 
  point: string;
  routeRecommendation: string[]; 
  startTimestamp: string;
  subtitle: string;
  title: string;
}
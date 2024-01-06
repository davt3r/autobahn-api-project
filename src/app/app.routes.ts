import { Routes } from '@angular/router';
import { RoadListComponent } from './components/road-list/road-list.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'road-list', component: RoadListComponent },
  { path: 'map', component: MapComponent },
];

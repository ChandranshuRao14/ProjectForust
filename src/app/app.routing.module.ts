import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/main/map/map.component';
import { DetailSIOComponent } from './components/main/detail-sio/detail-sio.component';
import { LandingComponent } from './components/main/landing/landing.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: LandingComponent },
  { path: 'map', component: MapComponent },
  { path: 'detail/:id', component: DetailSIOComponent },
  { path: 'search', component: DetailSIOComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

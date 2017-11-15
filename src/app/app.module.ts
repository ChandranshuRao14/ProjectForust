import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './components/shared/shared.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './components/navigation/navigation.module';
import { DetailSIOComponent } from './components/main/detail-sio/detail-sio.component';
import { MapComponent } from './components/main/map/map.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DetailSIOComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    NavigationModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

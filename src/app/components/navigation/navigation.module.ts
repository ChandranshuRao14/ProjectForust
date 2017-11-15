import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './search/search.component';
import { LogoComponent } from './logo/logo.component';
import { NavlinkComponent } from './navlink/navlink.component';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LogoComponent,
    NavigationComponent,
    NavlinkComponent,
    SearchComponent
  ],
  exports: [
    LogoComponent,
    NavigationComponent,
    NavlinkComponent,
    SearchComponent
  ]
})
export class NavigationModule { }

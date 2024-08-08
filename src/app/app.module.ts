import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  RouteReuseStrategy, RouterModule, RoutesRecognized } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from '../app/storage.service'
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,RouterModule,IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Storage,StorageService],
  bootstrap: [AppComponent], 
  exports: [HeaderComponent] // Agrega esto para exportar el componente
})


export class AppModule {}

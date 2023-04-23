import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {
  constructor() {}
}

import { MenuController } from '@ionic/angular';
@Component({
  selector: 'menu-example',
  templateUrl: 'menu-example.html',
  styleUrls: ['./menu-example.css'],
})
export class MenuExample {
constructor(private menu: MenuController) { }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  openEnd() {
    this.menu.open('end');
  }
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
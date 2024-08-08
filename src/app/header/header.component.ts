import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  isMenuOpen =false;
  toggleMenu():void{
    this.isMenuOpen = !this.isMenuOpen;

  }
  headerType: any;
  constructor(private router: Router) { }

ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        
         this.headerType =  this.getHeaderType();
      
        // Hacer algo con el tipo de encabezado, como actualizar una variable o propiedad del componente
      }
    });
  

  }

  getHeaderType() {
    const currentRoute = this.router.url;
    // Verificar la ruta actual y devolver un tipo de encabezado específico
    if (currentRoute === '/home') {
      return 1;
    } else if (currentRoute === '/quienes-somos') {
      return 1;
    }else if (currentRoute === '/nuestros-trabajos') {
      return 1
    }else if (currentRoute === '/catalogo') {
      return 1;
    }else if (currentRoute === '/registrate') {
        return 1;
    }else if (currentRoute === '/contacto') {
          return 1;
    }
    // Por defecto, si no se encuentra ninguna ruta específica, devolver un encabezado predeterminado
    return 3;
  }

}

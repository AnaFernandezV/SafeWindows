import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.page.html',
  styleUrls: ['./quienes-somos.page.scss'],
})
export class QuienesSomosPage implements OnInit {
  isMenuOpen =false;

  logeado:any; 
  
  KEY_LOGIN = 'logins';
  toggleMenu():void{
    this.isMenuOpen = !this.isMenuOpen;

  }
  constructor(private storageService: StorageService,private http: HttpClient,private router : Router) { }

  async ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.actualizarDatos();
      }
    });

   this.logeado= await this.storageService.ObtLogeado()
  }

  async actualizarDatos() {
    console.log('checkeo')
    this.logeado= await this.storageService.ObtLogeado()
  }

  async logOut(){
   
    this.storageService.eliminarid(this.KEY_LOGIN,this.logeado.id)
    swal.fire({ 
      icon: 'success',
      html: 'Cerrando Sesión',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      heightAuto: false
    }) 
    setTimeout(() => {
      this.storageService.isAuthenticated.next(false)
      // Aquí puedes agregar el código que deseas ejecutar después de la pausa de 3 segundos
      this.navigateToSameUrl() 
      
      
    }, 2000);
     
   }

   navigateToSameUrl(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }
  

}

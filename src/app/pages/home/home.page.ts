import { Component } from '@angular/core';
import { StorageService } from '../../storage.service'
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import swal from'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  logeado:any; 
  
  KEY_LOGIN = 'logins';
  isMenuOpen =false;

  toggleMenu():void{
    this.isMenuOpen = !this.isMenuOpen;

  }
  constructor(private storageService: StorageService,private http: HttpClient,private router : Router) {}
  async ngOnInit() {

  this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.actualizarDatos();
      }
    });

   this.logeado= await this.storageService.ObtLogeado()

   console.log(this.logeado)

  }

  async actualizarDatos() {
   
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

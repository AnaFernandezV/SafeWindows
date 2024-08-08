import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../storage.service'
import swal from'sweetalert2';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page implements OnInit {

  isMenuOpen =false;

  logeado:any; 
  
  KEY_LOGIN = 'logins';
  toggleMenu():void{
    this.isMenuOpen = !this.isMenuOpen;

  }
  constructor(private http: HttpClient,private storageService: StorageService,private router : Router) { }

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
      console.log('checkeo')
      this.logeado= await this.storageService.ObtLogeado()
      
    }
  
    /* LOG OUT */
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

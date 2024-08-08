import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../storage.service'
import swal from'sweetalert2';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  private httpSubscription: Subscription | undefined;
  catalogos:any=[]
  isMenuOpen =false;

  logeado:any; 
  
  KEY_LOGIN = 'logins';
  toggleMenu():void{
    this.isMenuOpen = !this.isMenuOpen;

  }
  constructor( private http: HttpClient,private storageService: StorageService,private router : Router) { }

   async ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.actualizarDatos();
      }
    });

   this.logeado= await this.storageService.ObtLogeado()
   this.dataCatalogo()
  }

  async actualizarDatos() {
    console.log('checkeo')
    this.logeado= await this.storageService.ObtLogeado()
    
  }



  async dataCatalogo(){

    this.httpSubscription=this.http.get('http://localhost:3000/catalogos').subscribe(data => {
        this.catalogos=data
        
       
      });
   }
   getImagenUrl(nombreImagen: string): string {
    return 'http://localhost:3000/uploads/' + nombreImagen;
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


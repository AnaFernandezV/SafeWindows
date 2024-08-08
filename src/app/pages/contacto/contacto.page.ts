import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from'sweetalert2';
import { AlertController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  isMenuOpen =false;

  logeado:any; 
  
  KEY_LOGIN = 'logins';
  toggleMenu():void{
    this.isMenuOpen = !this.isMenuOpen;

  }
  to: string = 'safewindows23@gmail.com';
  from: string = 'safewindows23@gmail.com';
  email!:string;
  subject!: string;
  text!: string;



  constructor(private http: HttpClient,private router : Router,private storageService: StorageService) { }

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

  sendEmail() {
    const emailData = {
      to: this.to,
      from: this.from,
      subject: this.subject+'- Email: '+ this.email,
      text: this.text+'\n\n  Mail de contacto  ' + this.email 
    };

    
    swal.fire({ 
      icon: 'success',
      html: 'Email enviado exitosamente',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      heightAuto: false
      
    })
   


    this.http.post('http://localhost:3000/send-email', emailData)
    .subscribe(
      () => {
        console.log('Correo electrónico enviado exitosamente');
        // Aquí puedes mostrar una notificación o redirigir a una página de éxito
      },
      (error) => {
        console.error(error);
        // Aquí puedes mostrar una notificación de error o manejar el error de alguna manera
      }
    );
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

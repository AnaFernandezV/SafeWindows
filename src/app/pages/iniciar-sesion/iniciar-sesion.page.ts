import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import swal from'sweetalert2';
import { BehaviorSubject } from 'rxjs'; 

import { StorageService } from '../../storage.service'

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  isMenuOpen =false;
  toggleMenu():void{
    this.isMenuOpen = !this.isMenuOpen;

  }
  

  KEY_LOGIN = 'logins';
  ingreso: any = {
    id: '',
    username: '',
    token: ''

  }
  tipo:any;
  esepera:any;
  logeado2: any =[{
    id : 0
  
}];

  logeado : any =[{
  
  }];

  login = new FormGroup({
    rut: new FormControl('',[Validators.required,Validators.email]),
    contrasena: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
  });
  

  constructor(private http: HttpClient,private router : Router,private storageService: StorageService) { }

  ngOnInit() {

    
  }


  data: any[] = [
    {

    }

  ]
  datalogin: any=[];


 
  


  async insDatos(){


    if( this.login.controls.rut.value == '' &&  this.login.controls.contrasena.value == ''  ){

      swal.fire({ 
        icon: 'warning',
        html: 'Por Favor ingresa datos :(',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        heightAuto: false
        
      })

    } else {

      this.data = [
        {
          username: this.login.controls.rut.value,
          password: this.login.controls.contrasena.value,
        }
    
      ]
      
      
      
      this.http.post("http://localhost:3000/auth/signin", this.data[0])
      .subscribe((data:any )=> {
  
        this.datalogin= data
        
  
        this.ingreso.id = this.datalogin.user.id
        this.ingreso.username = this.datalogin.user.username;
        this.tipo=this.datalogin.user.tipo
        
        
        
      this.storageService.agregar(this.KEY_LOGIN, this.ingreso) 
  
      swal.fire({ 
        icon: 'success',
        html: 'Ingreso correcto... Redirigiendo...',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        heightAuto: false
        
      })

       
         setTimeout(() => {
        if(this.tipo == 'admin'){
          this.storageService.isAuthenticated.next(true)
          
          this.router.navigate(['/admin']) 
        }else{
           this.router.navigate(['/home']) 
        }
        

        
  
        // Aquí puedes agregar el código que deseas ejecutar después de la pausa de 3 segundos
        /* this.router.navigate(['/admin'])  */
        
      }, 2000);
          
        
       }, error => {
        swal.fire({ 
          icon: 'error',
          html: 'Usuario o contraseña Incorrectos :(',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          heightAuto: false
          
        })
      });
      



    }
    
   
    

  }

 
}

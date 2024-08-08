import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-agregar-transporte',
  templateUrl: './agregar-transporte.page.html',
  styleUrls: ['./agregar-transporte.page.scss'],
})
export class AgregarTransportePage implements OnInit {
  transporte = new FormGroup({
    emp_tra: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    correo : new FormControl('',([Validators.required,Validators.email])),
    telefono: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    sector: new FormControl ('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    cargo_ser: new FormControl ('',Validators.required)
    
  });
  constructor(private storage: StorageService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  data: any[] = [
    {

    }

  ]

    //insersion de datos de Transporte
    insDatos(){
      this.data = [
        {
          emp_tra: this.transporte.controls.emp_tra.value,
          correo: this.transporte.controls.correo.value,
          telefono: this.transporte.controls.telefono.value,
          sector: this.transporte.controls.sector.value,
          cargo_ser: this.transporte.controls.cargo_ser.value,
          
 
         
        }
    
      ]
     
     
    //Metodo HTTP POST que inserta la informacion de transporte
    this.http.post("http://localhost:3000/auth/creatrasn", this.data[0])
    .subscribe(data => {
      swal.fire({ 
        icon: 'success',
        html: 'Transporte agregado',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        heightAuto: false
        
      })
   
     }, error => {
      console.log(error);
    });
   /*  this.router.navigate(['/admin'])   */


 }



 async logOut(){
 
   this.router.navigate(['/home'])  
 
 }

 verificarDatosFormulario(transporte: FormGroup): string | null {
  // Verifica si algún campo está vacío
  if (transporte.invalid) {
    return 'Faltan datos en el formulario.';
  }
  // Si todos los campos están completos, retorna null
  return null;
}

submitFormulario() {
  const mensajeError = this.verificarDatosFormulario(this.transporte);

   if (mensajeError) {
    swal.fire({ 
      icon: 'error',
      html: 'Porfavor Rellene tus datos',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      heightAuto: false
      
    })

    // Puedes mostrar el mensaje de error en tu interfaz de usuario o tomar otras acciones
  } else {
     this.insDatos()
  
  } 
}

}

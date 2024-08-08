import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import swal from'sweetalert2';
import { BehaviorSubject } from 'rxjs'; 


@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.page.html',
  styleUrls: ['./agregar-proveedor.page.scss'],
})
export class AgregarProveedorPage implements OnInit {

  proveedor = new FormGroup({
    nom_pro : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    correo: new FormControl ('',([Validators.required, Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')])),
    telefono: new FormControl('', [Validators.required,Validators.maxLength(9)]),
    direccion : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
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
       nom_pro: this.proveedor.controls.nom_pro.value,
       correo: this.proveedor.controls.correo.value,
       telefono: this.proveedor.controls.telefono.value,
       direccion: this.proveedor.controls.direccion.value,

      }

    ]
   

  //Metodo HTTP POST que inserta la informacion de transporte
  this.http.post("http://localhost:3000/auth/creaprove", this.data[0])
  .subscribe(data => {
    swal.fire({ 
      icon: 'success',
      html: 'Proveedor agregado',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      heightAuto: false
      
    })
    
   }, error => {
    console.log(error);
  });
 /*   this.router.navigate(['/admin']) 
 */

}



verificarDatosFormulario(proveedor: FormGroup): string | null {
  // Verifica si algún campo está vacío
  if (proveedor.invalid) {
    return 'Faltan datos en el formulario.';
  }
  // Si todos los campos están completos, retorna null
  return null;
}

submitFormulario() {
  const mensajeError = this.verificarDatosFormulario(this.proveedor);

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

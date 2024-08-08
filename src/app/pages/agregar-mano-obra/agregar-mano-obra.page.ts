import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import swal from'sweetalert2';
import { ValidacionesService } from 'src/app/services/validaciones.service'; 

@Component({
  selector: 'app-agregar-mano-obra',
  templateUrl: './agregar-mano-obra.page.html',
  styleUrls: ['./agregar-mano-obra.page.scss'],
})
export class AgregarManoObraPage implements OnInit {

  mano_obra = new FormGroup({
    nom_mano : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    ape_mano : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    rut: new FormControl('',[Validators.required,Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    correo: new FormControl ('',([Validators.required,Validators.email])),
    telefono: new FormControl('', Validators.required),
    especialidad : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
  });

  constructor(private storage: StorageService, private router: Router, private http: HttpClient,private validaciones:ValidacionesService) { }

  KEY_LOGIN = 'logins';
  logeado:any=[];

  ngOnInit() {

  }

  data: any[] = [
    {

    }

  ]

  insDatos(){


    //validacion de rut valido
    if(!this.validaciones.validarRut(this.mano_obra.controls.rut.value)){
      swal.fire({ 
        icon: 'error',
        html: 'Rut no válido :(',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        heightAuto: false
      })
      return;
    }



    this.data = [
      {
        nom_mano: this.mano_obra.controls.nom_mano.value,
        ape_mano: this.mano_obra.controls.ape_mano.value,
        rut: this.mano_obra.controls.rut.value,
        correo: this.mano_obra.controls.correo.value,
        telefono: this.mano_obra.controls.telefono.value,
        especialidad: this.mano_obra.controls.especialidad.value,
   
      }
  
    ]
  

   
  //Metodo HTTP POST que inserta la informacion de mano de obra
  this.http.post("http://localhost:3000/auth/creamanodeobra", this.data[0])
  .subscribe(data => {
    swal.fire({ 
      icon: 'success',
      html: 'Mano de obra agregado',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      heightAuto: false
      
    })
  
   }, error => {
    console.log(error);
  });
/*   this.router.navigate(['/admin'])   */


}
verificarDatosFormulario(mano_obra: FormGroup): string | null {
  // Verifica si algún campo está vacío
  if (mano_obra.invalid) {
    return 'Faltan datos en el formulario.';
  }
  // Si todos los campos están completos, retorna null
  return null;
}

submitFormulario() {
  const mensajeError = this.verificarDatosFormulario(this.mano_obra);

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

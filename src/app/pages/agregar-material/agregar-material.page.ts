import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../storage.service'
import swal from'sweetalert2';

@Component({
  selector: 'app-agregar-material',
  templateUrl: './agregar-material.page.html',
  styleUrls: ['./agregar-material.page.scss'],
})
export class AgregarMaterialPage implements OnInit {

//formulario de Material
  material = new FormGroup({
    nom_material: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    descripcion : new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+$')]),
    tipo: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(10), Validators.pattern('^[a-zA-Z]+$')]),
    precio: new FormControl ('', Validators.required)
  
  });

  constructor(private http: HttpClient,private router : Router, private storageService: StorageService) { }

  KEY_LOGIN = 'logins';
  logeado:any=[];

  ngOnInit() {
  }

  //inicializacion de variable
  data: any[] = [
    {

    }

  ]


  //insersion de datos de Material
  insDatos(){
    this.data = [
      {
        nom_material: this.material.controls.nom_material.value,
        descripcion: this.material.controls.descripcion.value,
        tipo: this.material.controls.tipo.value,
        precio: this.material.controls.precio.value,
       
      }
  
    ]

     

    //Metodo HTTP POST que inserta la informacion de material
    this.http.post("http://localhost:3000/auth/creamaterial", this.data[0])
    .subscribe(data => {
      swal.fire({ 
        icon: 'success',
        html: 'Material agregado',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        heightAuto: false
        
      })
    
     }, error => {
      console.log(error);
    });
    
    setTimeout(() => {
      
/*         this.router.navigate(['/admin']) */
      
      }, 2000);


}
async logOut(){
  this.storageService.eliminar(this.KEY_LOGIN,this.logeado.username)
   this.router.navigate(['/home'])  
 
 }

 verificarDatosFormulario(material: FormGroup): string | null {
  // Verifica si algún campo está vacío
  if (material.invalid) {
    return 'Faltan datos en el formulario.';
  }
  // Si todos los campos están completos, retorna null
  return null;
}

submitFormulario() {
  const mensajeError = this.verificarDatosFormulario(this.material);

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

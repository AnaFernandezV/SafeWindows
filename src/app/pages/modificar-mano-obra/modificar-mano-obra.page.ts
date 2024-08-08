import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-modificar-mano-obra',
  templateUrl: './modificar-mano-obra.page.html',
  styleUrls: ['./modificar-mano-obra.page.scss'],
})
export class ModificarManoObraPage implements OnInit {

  mano_obra = new FormGroup({
    nom_mano : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    ape_mano : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    rut: new FormControl('',[Validators.required,Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    correo: new FormControl ('',([Validators.required,Validators.email])),
    telefono: new FormControl('', Validators.required),
    especialidad : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
  });

  id: any = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router : Router, private storageService: StorageService) { }

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id')
    this.obtenerDatos() 
  }

  data: any[] = [
    {
      
    }

  ]

  datalogin: any=[];


  obtenerDatos(){
    this.data = [
     {
       id: this.id
       
     }
 
   ]

  
     this.http.post("http://localhost:3000/auth/vermanodeobra", this.data[0])
   .subscribe((data:any )=> {
     this.datalogin= data
     
     this.mano_obra.get('nom_mano')?.setValue(this.datalogin.foundEmp.nom_mano)
     this.mano_obra.get('ape_mano')?.setValue(this.datalogin.foundEmp.ape_mano)
     this.mano_obra.get('rut')?.setValue(this.datalogin.foundEmp.rut)
     this.mano_obra.get('telefono')?.setValue(this.datalogin.foundEmp.telefono)
     this.mano_obra.get('correo')?.setValue(this.datalogin.foundEmp.correo)
     this.mano_obra.get('especialidad')?.setValue(this.datalogin.foundEmp.especialidad)

     console.log(this.obtenerDatos);
     
    }, error => {
     console.log(error);
   });

 }


 async  modMano(){
  this.data = [
    {

      nom_mano: this.mano_obra.controls.nom_mano.value,
      ape_mano: this.mano_obra.controls.ape_mano.value,
      rut: this.mano_obra.controls.rut.value,
      telefono: this.mano_obra.controls.telefono.value,
      correo: this.mano_obra.controls.correo.value,
      especialidad: this.mano_obra.controls.especialidad.value,
      
      
    }

  ]

    await this.http.put("http://localhost:3000/modobra/"+this.id, this.data[0])
  .subscribe(data => {
    swal.fire({ 
      icon: 'success',
      html: 'Se ha modificado correctamente',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      heightAuto: false
      
    })
  
   /*   this.router.navigate(['/admin'])  */
   }, error => {
    console.log(error);
  });
  

 
   
}

}

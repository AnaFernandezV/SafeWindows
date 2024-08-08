import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-modificar-proveedor',
  templateUrl: './modificar-proveedor.page.html',
  styleUrls: ['./modificar-proveedor.page.scss'],
})
export class ModificarProveedorPage implements OnInit {

  proveedor = new FormGroup({
    nom_pro : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    correo: new FormControl ('',([Validators.required, Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')])),
    telefono: new FormControl('', [Validators.required,Validators.maxLength(9)]),
    direccion : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
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

  
     this.http.post("http://localhost:3000/auth/verproveedor", this.data[0])
   .subscribe((data:any )=> {
     this.datalogin= data
     
     this.proveedor.get('nom_pro')?.setValue(this.datalogin.foundEmp.nom_pro)
     this.proveedor.get('correo')?.setValue(this.datalogin.foundEmp.correo)
     this.proveedor.get('telefono')?.setValue(this.datalogin.foundEmp.telefono)
     this.proveedor.get('direccion')?.setValue(this.datalogin.foundEmp.direccion)
  

   
     
    }, error => {
     console.log(error);
   });

 }

 async modProveedor(){
  this.data = [
    {

      nom_pro: this.proveedor.controls.nom_pro.value,
      correo: this.proveedor.controls.correo.value,
      telefono: this.proveedor.controls.telefono.value,
      direccion: this.proveedor.controls.direccion.value,
       
      
      
    }

  ]

    await this.http.put("http://localhost:3000/modprove/"+this.id, this.data[0])
  .subscribe(data => {
    swal.fire({ 
      icon: 'success',
      html: 'Se ha modificado correctamente',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      heightAuto: false
      
    })
/* 
     this.router.navigate(['/admin'])  */
   }, error => {
    console.log(error);
  });
  

 
   
}

}
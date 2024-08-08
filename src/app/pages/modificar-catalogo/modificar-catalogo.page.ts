import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import { HttpClient } from '@angular/common/http';
import swal from'sweetalert2';

@Component({
  selector: 'app-modificar-catalogo',
  templateUrl: './modificar-catalogo.page.html',
  styleUrls: ['./modificar-catalogo.page.scss'],
})

export class ModificarCatalogoPage implements OnInit {
  catalogo = new FormGroup({
    nom_cata: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    descripcion : new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+$')]),
    extra: new FormControl('',[Validators.required, Validators.min(3)]),
    imagen: new FormControl('',Validators.required)
    
  });

  id: any = '';
  nombrecatalogo!: string;

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

  
     this.http.post("http://localhost:3000/auth/vercatalogo", this.data[0])
   .subscribe((data:any )=> {
     this.datalogin= data
     
     this.catalogo.get('nom_cata')?.setValue(this.datalogin.nom_cata)
     this.catalogo.get('descripcion')?.setValue(this.datalogin.descripcion)
     this.catalogo.get('extra')?.setValue(this.datalogin.extra)
     this.catalogo.get('imagen')?.setValue(this.datalogin.imagen) 
     this.nombrecatalogo=this.datalogin.imagen

   
     
    }, error => {
     console.log(error);
   });

 }

 async  modCatalogo(){
  this.data = [
    {

      nom_cata: this.catalogo.controls.nom_cata.value,
      descripcion: this.catalogo.controls.descripcion.value,
      extra: this.catalogo.controls.extra.value,
      imagen: this.catalogo.controls.imagen.value,
   
      
      
    }

  ]

    await this.http.put("http://localhost:3000/modcata/"+this.id, this.data[0])
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
 /*  this.router.navigate(['/admin'])   */

 
   
}

getImagenUrl(nombreImagen: string): string {
  return 'http://localhost:3000/uploads/' + nombreImagen;
}

}

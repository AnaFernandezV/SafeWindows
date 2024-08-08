import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { StorageService } from '../../storage.service'
import swal from'sweetalert2';


@Component({
  selector: 'app-modificar-material',
  templateUrl: './modificar-material.page.html',
  styleUrls: ['./modificar-material.page.scss'],
})
export class ModificarMaterialPage implements OnInit {
  material = new FormGroup({
    nom_material: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    descripcion : new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    tipo: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    precio: new FormControl ()
  });
  KEY_LOGIN = 'logins';

  logeado : any =[{
    
  }];

  id: any = '';
  constructor(private route: ActivatedRoute,private http: HttpClient,
    private router : Router,private storageService: StorageService) { }

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

   
       this.http.post("http://localhost:3000/auth/vermaterial", this.data[0])
    .subscribe((data:any )=> {
      this.datalogin= data
      
      this.material.get('nom_material')?.setValue(this.datalogin.foundEmp.nom_material)
      this.material.get('descripcion')?.setValue(this.datalogin.foundEmp.descripcion)
      this.material.get('tipo')?.setValue(this.datalogin.foundEmp.tipo)
      this.material.get('precio')?.setValue(this.datalogin.foundEmp.precio)
    

     

    
      
     }, error => {
      console.log(error);
    });

  }



 async  modMaterial(){
    this.data = [
      {
        nom_material: this.material.controls.nom_material.value,
        descripcion: this.material.controls.descripcion.value,
        tipo: this.material.controls.tipo.value,
        precio: this.material.controls.precio.value,
        
      }
  
    ]

      await this.http.put("http://localhost:3000/modmat/"+this.id, this.data[0])
    .subscribe(data => {
      swal.fire({ 
        icon: 'success',
        html: 'Se ha modificado correctamente',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        heightAuto: false
        
      })
   
/*        this.router.navigate(['/admin'])  */
     }, error => {
      console.log(error);
    });
    

   
     
  }

}

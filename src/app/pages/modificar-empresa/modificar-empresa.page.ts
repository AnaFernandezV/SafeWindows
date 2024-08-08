import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { StorageService } from '../../storage.service'
import swal from'sweetalert2';

@Component({
  selector: 'app-modificar-empresa',
  templateUrl: './modificar-empresa.page.html',
  styleUrls: ['./modificar-empresa.page.scss'],
})

export class ModificarEmpresaPage implements OnInit {
  empresa = new FormGroup({
    rut: new FormControl(''),
    nom_empresa : new FormControl(),
    telefono: new FormControl(),
    correo: new FormControl (),
    contrasena: new FormControl(),
    direccion: new FormControl(),
  });
  KEY_LOGIN = 'logins';

  logeado : any =[{
    
  }];

  id: any = '';
  constructor(private route: ActivatedRoute,private http: HttpClient,
    private router : Router,private storageService: StorageService) { }

  ngOnInit() {
    //Recuera la id de la URL
    this.id=this.route.snapshot.paramMap.get('id')
    //Obtiene los datos de la empresa a modificar
    this.obtenerDatos()
    
  }
    data: any[] = [
    {
      
    }

  ]
  datalogin: any=[];



   obtenerDatos(){
    // variable para buscar empresa
     this.data = [
      {
        id: this.id
        
      }
  
    ]

    //Metodo HTTP
       this.http.post("http://localhost:3000/auth/verempresa", this.data[0])
    .subscribe((data:any )=> {
      this.datalogin= data
      //Asignacion de valores
      this.empresa.get('nom_empresa')?.setValue(this.datalogin.foundEmp.nom_empresa)
      this.empresa.get('rut')?.setValue(this.datalogin.foundEmp.rut)
      this.empresa.get('telefono')?.setValue(this.datalogin.foundEmp.telefono)
      this.empresa.get('correo')?.setValue(this.datalogin.foundEmp.correo)
      this.empresa.get('direccion')?.setValue(this.datalogin.foundEmp.direccion)

     

    
      
     }, error => {
      console.log(error);
    });

  }



 async  modEmpresa(){
  // se le asignan a data los valores a modificar
    this.data = [
      {
        rut: this.empresa.controls.rut.value,
        nom_empresa: this.empresa.controls.nom_empresa.value,
        contrasena: this.empresa.controls.contrasena.value,
        telefono: this.empresa.controls.telefono.value,
        correo: this.empresa.controls.correo.value,
        direccion: this.empresa.controls.direccion.value,
      }
  
    ]
    //metodo HTTP PUT para modificar los datos
      await this.http.put("http://localhost:3000/modemp/"+this.id, this.data[0])
    .subscribe(data => {
      swal.fire({ 
        icon: 'success',
        html: 'Se ha modificado correctamente',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        heightAuto: false
        
      })
   
   /*     this.router.navigate(['/admin'])  */
     }, error => {
      console.log(error);
    });
    

   
     
  }

}

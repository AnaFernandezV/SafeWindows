import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from'sweetalert2';
@Component({
  selector: 'app-modificar-credencial',
  templateUrl: './modificar-credencial.page.html',
  styleUrls: ['./modificar-credencial.page.scss'],
})
export class ModificarCredencialPage implements OnInit {

  
  credencial= new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    tipo : new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(8), Validators.pattern('^[a-zA-Z]+$')]),

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

  
     this.http.post("http://localhost:3000/auth/vercredencial", this.data[0])
   .subscribe((data:any )=> {
     this.datalogin= data
     
     this.credencial.get('username')?.setValue(this.datalogin.foundEmp.username)
     this.credencial.get('tipo')?.setValue(this.datalogin.foundEmp.tipo)

     
    }, error => {
     console.log(error);
   });

 }

 async modCredencial(){
  this.data = [
    {

      username: this.credencial.controls.username.value,
      tipo: this.credencial.controls.tipo.value,
   
       
      
      
    }

  ]

    await this.http.put("http://localhost:3000/modcrede/"+this.id, this.data[0])
  .subscribe(data => {
    swal.fire({ 
      icon: 'success',
      html: 'Se ha modificado correctamente',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      heightAuto: false
      
    })
   
    /*  this.router.navigate(['/admin'])  */
   }, error => {
    console.log(error);
  });
  

 
   
}

}

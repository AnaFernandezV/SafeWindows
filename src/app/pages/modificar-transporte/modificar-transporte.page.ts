import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-modificar-transporte',
  templateUrl: './modificar-transporte.page.html',
  styleUrls: ['./modificar-transporte.page.scss'],
})
export class ModificarTransportePage implements OnInit {

  transporte = new FormGroup({
    emp_tra: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    correo: new FormControl ('',([Validators.required, Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')])),
    telefono: new FormControl('', [Validators.required,Validators.maxLength(9)]),
    sector: new FormControl ('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    cargo_ser: new FormControl ('',Validators.required)
    
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

  
     this.http.post("http://localhost:3000/auth/vertransporte", this.data[0])
   .subscribe((data:any )=> {
     this.datalogin= data
     
     this.transporte.get('emp_tra')?.setValue(this.datalogin.foundEmp.emp_tra)
     this.transporte.get('telefono')?.setValue(this.datalogin.foundEmp.telefono)
     this.transporte.get('correo')?.setValue(this.datalogin.foundEmp.correo)
     this.transporte.get('sector')?.setValue(this.datalogin.foundEmp.sector)
     this.transporte.get('cargo_ser')?.setValue(this.datalogin.foundEmp.cargo_ser)

    
     
    }, error => {
     console.log(error);
   });

 }

 async  modTransporte(){
  this.data = [
    {

      emp_tra: this.transporte.controls.emp_tra.value,
      correo: this.transporte.controls.correo.value,
      telefono: this.transporte.controls.telefono.value,
      sector: this.transporte.controls.sector.value,
      cargo_ser: this.transporte.controls.cargo_ser.value,
      
      
    }

  ]

    await this.http.put("http://localhost:3000/modtran/"+this.id, this.data[0])
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

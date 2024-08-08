import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-cotizacion',
  templateUrl: './ver-cotizacion.page.html',
  styleUrls: ['./ver-cotizacion.page.scss'],
})
export class VerCotizacionPage implements OnInit {

  cotizacion = new FormGroup({
    estado : new FormControl(''),
  })

  codigo: any = '';
  data: any[]=[{}]
  
  datacotizacion: any = [];



  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit() {
    this.codigo=this.route.snapshot.paramMap.get('codigo')

    this.obtenerDatos()



  }

  
  obtenerDatos(){
    this.data = [
     {
       codigo: this.codigo
       
     }
 
   ]
  
    this.http.post("http://localhost:3000/auth/verdetallecotizacion",this.data[0])
   .subscribe((data)=> {

    this.datacotizacion= data

    



   
   
   
     
    }, error => {
     console.log(error);
   });

 }


async  modificarcotizacion(){
  this.data = [
    {
      estado: this.cotizacion.value.estado
      
    }

  ]
  await this.http.put("http://localhost:3000/modcotizacion/"+this.codigo, this.data[0])
  .subscribe(data => {
    Swal.fire({ 
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

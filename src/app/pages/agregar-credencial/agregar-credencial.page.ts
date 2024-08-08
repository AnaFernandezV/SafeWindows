import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-agregar-credencial',
  templateUrl: './agregar-credencial.page.html',
  styleUrls: ['./agregar-credencial.page.scss'],
})
export class AgregarCredencialPage implements OnInit {

  
   credencial= new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    tipo : new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(8), Validators.pattern('^[a-zA-Z]+$')]),

  });

  constructor(private storage: StorageService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  data: any[] = [
    {

    }

  ]

    //insersion de datos de Transporte
    insDatos(){
      this.data = [
        {
         username: this.credencial.controls.username.value,
         tipo: this.credencial.controls.tipo.value,
        
  
  
  
        }
  
      ]
  
  
    //Metodo HTTP POST que inserta la informacion de transporte
    this.http.post("http://localhost:3000/auth/creaprove", this.data[0])
    .subscribe(data => {
      swal.fire({ 
        icon: 'success',
        html: 'Credencial agregado',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        heightAuto: false
        
      })
     
     }, error => {
      console.log(error);
    });
/*     this.router.navigate(['/admin']) */ 
  
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from'sweetalert2';

@Component({
  selector: 'app-agregar-catalogo',
  templateUrl: './agregar-catalogo.page.html',
  styleUrls: ['./agregar-catalogo.page.scss'],
})
export class AgregarCatalogoPage implements OnInit {
  selectedImage!: File;
  constructor(private http: HttpClient) { }
//formulario de Material
catalogo = new FormGroup({
  nom_cata: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
  descripcion : new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+$')]),
  extra: new FormControl('',[Validators.required, Validators.min(3)]),
  imagen: new FormControl('',Validators.required)
  
});

  ngOnInit() {
  }
  data: any[] = [
    {

    }

  ]
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

 /*  onUpload() {

    
    const uploadData = new FormData();
    uploadData.append('image', this.selectedImage, this.selectedImage.name);

    this.http.post('http://localhost:3000/upload', uploadData)
      .subscribe(response => {
        console.log(response);
        // Realiza cualquier acción adicional después de subir la imagen
      }, error => {
        console.error(error);
      });
  }
 */
  onSubmit() {


    this.data = [
      {
        nom_cata: this.catalogo.controls.nom_cata.value,
        descripcion: this.catalogo.controls.descripcion.value,
        extra:this.catalogo.controls.extra.value,
        imagen: this.selectedImage.name

       
      }
  
    ]

    const uploadData = new FormData();
    uploadData.append('image', this.selectedImage, this.selectedImage.name);

    this.http.post('http://localhost:3000/upload', uploadData)
      .subscribe(response => {
        console.log(response);
        // Realiza cualquier acción adicional después de subir la imagen
      }, error => {
        console.error(error);
      });

      this.http.post("http://localhost:3000/auth/creacatalogo", this.data[0])
      .subscribe(data => {
        swal.fire({ 
          icon: 'success',
          html: 'Catalogo agregado',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          heightAuto: false
          
        })
        
       }, error => {
        console.log(error);
      });
  }

}

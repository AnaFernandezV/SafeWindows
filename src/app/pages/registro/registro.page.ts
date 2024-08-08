import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import swal from'sweetalert2';
import { ValidacionesService } from 'src/app/services/validaciones.service'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  isMenuOpen =false;
  toggleMenu():void{
    this.isMenuOpen = !this.isMenuOpen;

  }
//Modelo de empresa
  empresa = new FormGroup({
    rut: new FormControl('',[Validators.required,Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nom_empresa : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    telefono: new FormControl('', [Validators.required,Validators.maxLength(9)]),
    correo: new FormControl ('',([Validators.required, Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')])),  
    direccion: new FormControl('',[Validators.required,Validators.minLength(5)]),
  });


  numero=Math.floor(Math.random() * 899) + 100;
  username:any;
  password:string='';
  tipo:string='user'


  from: string = 'safewindows23@gmail.com';
  constructor(private http: HttpClient, private validaciones:ValidacionesService ) { }

  ngOnInit() {
  }
  //inicializa variable vacia
  data: any[] = [
    {

    }

  ]
  datauser: any[] = [
    {

    }

  ]



 generarContrasenaAleatoria(longitud: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let contrasena = '' ;
  
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      contrasena += caracteres.charAt(indice);
    }
  
    return contrasena;
  }

  //insert de datos de tipo Empresa
  insDatos(){

    //validacion de rut valido
    if(!this.validaciones.validarRut(this.empresa.controls.rut.value)){
      swal.fire({ 
        icon: 'error',
        html: 'Rut no válido :(',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        heightAuto: false
      })
      return;
    }


    //asigna los datos que esten en el formulario

    this.username= this.empresa.controls.correo.value
    this.password= this.generarContrasenaAleatoria(8)

    this.data = [
      { 
        id: this.numero,
        rut: this.empresa.controls.rut.value,
        nom_empresa: this.empresa.controls.nom_empresa.value,
        contrasena: this.password,
        telefono: this.empresa.controls.telefono.value,
        correo: this.empresa.controls.correo.value,
        direccion: this.empresa.controls.direccion.value,
      }
  
    ]

    this.datauser = [
      { 
        id:this.numero,
        username:this.empresa.controls.correo.value,
        password: this.password,
        tipo: this.tipo
      }
  
    ]

    

  

    // Metodo HTTP Post que Crea la empresa.
    this.http.post("http://localhost:3000/auth/creaempresa", this.data[0])
    .subscribe(data => {



      this.http.post("http://localhost:3000/auth/signup", this.datauser[0])
      .subscribe(data => {
          
          let to =this.empresa.controls.correo.value
          const emailData = {
            to: to,
            from: this.from,
            subject: 'Credenciales de usuario',
            text: 'Gracias por registrarse en Safe Windows.\n estas son sus credenciales:\n\n Usuario: ' +this.empresa.controls.correo.value+'\n Contraseña: ' +this.password
          };
      
          
          swal.fire({ 
            icon: 'success',
            html: 'Su usuario Fue registrado Exitosamente,Revise sus credenciales en su correo para poder acceder',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            heightAuto: false
            
          })
         
      
      
          this.http.post('http://localhost:3000/send-email', emailData)
          .subscribe(
            () => {
              console.log('Correo electrónico enviado exitosamente');
              // Aquí puedes mostrar una notificación o redirigir a una página de éxito
            },
            (error) => {
              console.error(error);
              // Aquí puedes mostrar una notificación de error o manejar el error de alguna manera
            }
          );
      
      
      






  
       
       }, error => {
        console.log(error);
      });

     }, error => {
      if(error.error=='LA EMPRESA EXISTE'){
        swal.fire({ 
          icon: 'error',
          html: 'Ya existe un usuario registrado con este email :(',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          heightAuto: false
          
        })
      };
    });
    
    

  }

  verificarDatosFormulario(empresa: FormGroup): string | null {
    // Verifica si algún campo está vacío
    if (empresa.invalid) {
      return 'Faltan datos en el formulario.';
    }
    // Si todos los campos están completos, retorna null
    return null;
  }

  submitFormulario() {
    const mensajeError = this.verificarDatosFormulario(this.empresa);

     if (mensajeError) {
      swal.fire({ 
        icon: 'error',
        html: 'Porfavor Rellene tus datos',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        heightAuto: false
        
      })

      // Puedes mostrar el mensaje de error en tu interfaz de usuario o tomar otras acciones
    } else {
       this.insDatos()
    
    } 
  }

}

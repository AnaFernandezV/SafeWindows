import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit , OnDestroy } from '@angular/core';
import { ActivatedRoute , NavigationEnd, Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StorageService } from '../../storage.service'
import { Subscription } from 'rxjs';
import Swal from'sweetalert2';
import jsPDF from 'jspdf';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit{

  private httpSubscription: Subscription | undefined;

  
﻿//Variables a Utilizar

resultados: any[] = [];
valorBuscado:any
verbuscado:boolean = false
botonDescargaReporte= false


fechaInicio!:any;
FechaFin!:any;



  data: any[] = [
    {
      
    }

  ]
  ingreso: any = {
    id: '',
    username: '',
    token: ''

  }
  KEY_LOGIN = 'logins';
  
 //VARIABLES DE DATOS DE LA bd
  logeado:any=[];
  empresas:any=[];
  materiales:any=[];
  transportes: any = [];
  proveedores: any = [];
  manodeobras: any = [];
  cotizaciones: any = [];
  catalogos: any=[];
  credenciales: any = [] ;
  reportes: any = [] ;
  detallereportes: any = [] ;
  esepera:any;

  KEY_CONSULTA:any=[];
 
  constructor(private router : Router,
     private activatedRoute: ActivatedRoute, private http: HttpClient,private storageService: StorageService
     ) {
    
      
    
     }



 async ngOnInit() {

   
     this.esepera= await this.ObtLogeado()
     if(this.esepera.tipo=="user"){
      this.router.navigate(['/home'])
     }
     
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.actualizarDatos();
      }
    });



    //Recibe datos de la base de datos !
    await this.dataEmp()
    await this.dataMat()
    await  this.dataTrans()
    await this.dataCotizacion()
    await this.dataCatalogo()
    await this.dataCredencial()
    await this.dataMano();
    await this.dataProve();

  }


  //FUNCIONES DE SESION

  async actualizarDatos() {
    await this.dataEmp()
    await this.dataMat()
    await  this.dataTrans()
    await this.dataCotizacion()
    await this.dataCatalogo()
    await this.dataCredencial()
    await this.dataMano();
    await this.dataProve();
    
  }

  //DESTRUYE EL STORAGE DE SESION
  async logOut(){
    this.storageService.eliminar(this.KEY_LOGIN,this.logeado.username)
    this.storageService.isAuthenticated.next(false)
    setTimeout(() => {
      
      
      // Aquí puedes agregar el código que deseas ejecutar después de la pausa de 3 segundos
      this.router.navigate(['/home'])  
      
    }, 2000);
     
   
   
   }
   
  //Funcion para Obtener El usuario Logeado Del STORAGE
  async ObtLogeado(){
   
    this.logeado = await this.storageService.getDatos(this.KEY_LOGIN)
    
   this.logeado= this.logeado[0]
   console.log(this.logeado.id)
  return this.storageService.obtenerDatos(this.logeado.id)
   
 }





 //-----------------------------------------------------------------EMPRESAS----------------------------------------------------------------
 //BOTON slider de empresa
 botonEmpresas(){
  this.resultados = [];
  this.verbuscado=false
  this.dataEmp()
  
  
}

//)OBTIENE LA DATA DE LA EMPRESAS
  async dataEmp(){

  this.httpSubscription=this.http.get('http://localhost:3000/empresas').subscribe(data => {
      this.empresas=data
   
      
      
    });
 }
//Elimina LA EMPRESA
/* DeleteEmp(id:any){
  
  
  this.http.delete('http://localhost:3000/modemp/'+ id).subscribe(data => {
  });
  this.http.get('http://localhost:3000/empresas', this.KEY_CONSULTA).subscribe(data => {
   
    this.empresas=data
  });
} */

DeleteEmp(id:any){


  Swal.fire({
    title: '¿Estás Seguro?',
    text: "¡Esta acción no podrá ser revertida!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Eliminar!',
    cancelButtonText:'Cancelar',
    heightAuto: false
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Eliminado',
        text: "Se a Eliminado la Empresa",
        heightAuto: false
      })
      //Elimina la empresa
      this.http.delete('http://localhost:3000/modemp/'+ id).subscribe(data => {
  });
      //Vuelve a consultar empresa
      this.http.get('http://localhost:3000/empresas', this.KEY_CONSULTA).subscribe(data => {
   
    this.empresas=data
  });
}
  })

  
}
// --------------------------------------------------- fin empresas---------------------------------------------------------------



 //-----------------------------------------------------------------MATERIALES----------------------------------------------------------------
botonMateriales(){
  this.resultados = [];
  this.verbuscado=false
  this.dataMat()
  
}


async dataMat(){

  this.httpSubscription=this.http.get('http://localhost:3000/materiales', ).subscribe(data => {
      this.materiales=data
     
    });
 }

 DeleteMat(id:any){


  Swal.fire({
    title: '¿Estás Seguro?',
    text: "¡Esta acción no podrá ser revertida!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Eliminar!',
    cancelButtonText:'Cancelar',
    heightAuto: false
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Eliminado',
        text: "Se a Eliminado el Material",
        heightAuto: false
      })
      //Elimina los materiales
      this.http.delete('http://localhost:3000/modmat/'+ id).subscribe(data => {
      });
      //Vuelve a consultar los materiales
      this.http.get('http://localhost:3000/materiales', this.KEY_CONSULTA).subscribe(data => {
        this.materiales=data
       });
    }
  })


  
}

//-----------------------------------------------------------------TRANSPORTE----------------------------------------------------------------
botontransporte(){
  this.resultados = [];
  this.verbuscado=false
  this.dataTrans();
  
}


async dataTrans(){

  this.httpSubscription=this.http.get('http://localhost:3000/transportes').subscribe(data => {
      this.transportes = data
     
    });
 }


 DeleteTrans(id:any){


Swal.fire({
  title: '¿Estás Seguro?',
  text: "¡Esta acción no podrá ser revertida!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Sí, Eliminar!',
  cancelButtonText:'Cancelar',
  heightAuto: false
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Eliminado',
        text: "Se a Eliminado el Transporte",
        heightAuto: false
      })
      //Elimina los transporte
      this.http.delete('http://localhost:3000/modtran/'+ id).subscribe(data => {
      });
      //Vuelve a consultar los materiales
      this.http.get('http://localhost:3000/transportes').subscribe(data => {
        this.transportes=data
       });
    }
  })


  
}



//-----------------------------------------------------------------MANO OBRA----------------------------------------------------------------
botonmano(){
  this.resultados = [];
  this.verbuscado=false
  this.dataMano();
  
}


async dataMano(){

  this.httpSubscription=this.http.get('http://localhost:3000/manodeobras').subscribe(data => {
      this.manodeobras = data
     
    });
 }


 DeleteMano(id:any){

  Swal.fire({
    title: '¿Estás Seguro?',
    text: "¡Esta acción no podrá ser revertida!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Eliminar!',
    cancelButtonText:'Cancelar',
    heightAuto: false
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Eliminado',
        text: "Se a Eliminado el Personal",
        heightAuto: false
      })
      //Elimina los transporte
      this.http.delete('http://localhost:3000/modobra/'+ id).subscribe(data => {
      });
      //Vuelve a consultar los materiales
      this.http.get('http://localhost:3000/manodeobras').subscribe(data => {
        this.manodeobras=data
       });
    }
  })

}

//-----------------------------------------------------------------PROVEEDOR----------------------------------------------------------------
botonproveedor(){
  this.resultados = [];
  this.verbuscado=false
  this.dataProve();

}


async dataProve(){

  this.httpSubscription=this.http.get('http://localhost:3000/proveedores').subscribe(data => {
      this.proveedores = data

    });
 }


 DeleteProve(id:any){

  Swal.fire({
    title: '¿Estás Seguro?',
    text: "¡Esta acción no podrá ser revertida!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Eliminar!',
    cancelButtonText:'Cancelar',
    heightAuto: false
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Eliminado',
        text: "Se a Eliminado el Proveedor",
        heightAuto: false
      })
      //Elimina los transporte
      this.http.delete('http://localhost:3000/modprove/'+ id).subscribe(data => {
      });
      //Vuelve a consultar los materiales
      this.http.get('http://localhost:3000/proveedores').subscribe(data => {
        this.transportes=data
       });
    }
  })



}

//-------------------------------------------------------------COTIZACION-------------------------------------------------------------


async dataCotizacion(){

  this.httpSubscription=this.http.get('http://localhost:3000/cotizaciones').subscribe(data => {
      this.cotizaciones = data

    });
 }
 botoncotizacion(){
  this.resultados = [];
  this.verbuscado=false;
  this.dataCotizacion();
  

}

//-------------------------------------------------------------CATALOGO-------------------------------------------------------------
botoncatalogo(){
  this.resultados = [];
  this.verbuscado=false;
  this.dataCatalogo();
  

}

 async dataCatalogo(){

  this.httpSubscription=this.http.get('http://localhost:3000/catalogos').subscribe(data => {
      this.catalogos=data
      
     
    });
 }
 getImagenUrl(nombreImagen: string): string {
  return 'http://localhost:3000/uploads/' + nombreImagen;
}


DeleteCatalogo(id:any){

  Swal.fire({
    title: '¿Estás Seguro?',
    text: "¡Esta acción no podrá ser revertida!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Eliminar!',
    cancelButtonText:'Cancelar',
    heightAuto: false
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Eliminado',
        text: "Se a Eliminado el Catalogo",
        heightAuto: false
      })
      //Elimina los transporte
      this.http.delete('http://localhost:3000/modcata/'+ id).subscribe(data => {
      });
      //Vuelve a consultar los catalogos
      this.http.get('http://localhost:3000/catalogos').subscribe(data => {
        this.catalogos=data
       });
    }
  })


  }
//-------------------------------------------------------------CREDENCIAL-------------------------------------------------------------
  async dataCredencial(){

    this.httpSubscription=this.http.get('http://localhost:3000/users').subscribe(data => {
        this.credenciales = data
       
      });
   }


   async botonCredencial(){
    
    this.resultados = [];
    this.verbuscado=false
    this.dataCredencial();
    
  
  }

  DeleteCredencial(id:any){

    Swal.fire({
      title: '¿Estás Seguro?',
      text: "¡Esta acción no podrá ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText:'Cancelar',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminado',
          text: "Se a Eliminado el Usuario",
          heightAuto: false
        })
        //Elimina los transporte
        this.http.delete('http://localhost:3000/modcrede/'+ id).subscribe(data => {
        }); 
        //Vuelve a consultar las credenciales
         this.http.get('http://localhost:3000/users').subscribe(data => {
          this.credenciales=data
         }); 
      }
    })
  
  
    }
  
    downloadPDF2(filename: string): void {
      const url = `http://localhost:3000/download-pdf/${filename}`;
    
      this.http.get(url, { responseType: 'blob' }).subscribe(
        (data: Blob) => {
          // Crear un objeto URL para el blob del PDF
          const fileURL = URL.createObjectURL(data);
    
          // Crear un enlace para descargar el archivo
          const link = document.createElement('a');
          link.href = fileURL;
          link.download = `${filename}.pdf`;
          link.click();
    
          // Liberar el objeto URL
          URL.revokeObjectURL(fileURL);
        },
        (error) => {
          console.error('Error al descargar el PDF:', error);
          // Manejar el error según tus necesidades
        }
      );
    }






    buscarElemento(valorBuscado: string,numero: Number): void {
     
      this.verbuscado=true
     if(valorBuscado==undefined){
      valorBuscado=''
     }
      const valorMinusculas = valorBuscado.toLowerCase();

      this.resultados = [];
  
      

      switch (numero) {
        case 1:

        
          for (let i = 0; i < this.catalogos.length; i++) {
            const objeto = this.catalogos[i];
      
            for (let key in objeto) {
              const valor = objeto[key];
              const valorPropiedadMinusculas = String(valor).toLowerCase();
      
              if (valorPropiedadMinusculas.includes(valorMinusculas)) {
                this.resultados.push(objeto);
                break;
              }
            }
          

        }
          
          break;
        case 2:
          // Acciones para la opción 2
          for (let i = 0; i < this.cotizaciones.length; i++) {
            const objeto = this.cotizaciones[i];
      
            for (let key in objeto) {
              const valor = objeto[key];
              const valorPropiedadMinusculas = String(valor).toLowerCase();
      
              if (valorPropiedadMinusculas.includes(valorMinusculas)) {
                this.resultados.push(objeto);
                break;
              }
            }
          }
          break;
        case 3:
          // Acciones para la opción 3
          for (let i = 0; i < this.credenciales.length; i++) {
            const objeto = this.credenciales[i];
      
            for (let key in objeto) {
              const valor = objeto[key];
              const valorPropiedadMinusculas = String(valor).toLowerCase();
      
              if (valorPropiedadMinusculas.includes(valorMinusculas)) {
                this.resultados.push(objeto);
                break;
              }
            }
          }
          break;
        case 4:
            // Acciones para la opción 4
            for (let i = 0; i < this.empresas.length; i++) {
              const objeto = this.empresas[i];
        
              for (let key in objeto) {
                const valor = objeto[key];
                const valorPropiedadMinusculas = String(valor).toLowerCase();
        
                if (valorPropiedadMinusculas.includes(valorMinusculas)) {
                  this.resultados.push(objeto);
                  break;
                }
              }
            }
            break;
        case 5:
              // Acciones para la opción 3
              for (let i = 0; i < this.manodeobras.length; i++) {
                const objeto = this.manodeobras[i];
          
                for (let key in objeto) {
                  const valor = objeto[key];
                  const valorPropiedadMinusculas = String(valor).toLowerCase();
          
                  if (valorPropiedadMinusculas.includes(valorMinusculas)) {
                    this.resultados.push(objeto);
                    break;
                  }
                }
              }
              break;
        case 6:
          // Acciones para la opción 3
          for (let i = 0; i < this.materiales.length; i++) {
            const objeto = this.materiales[i];
      
            for (let key in objeto) {
              const valor = objeto[key];
              const valorPropiedadMinusculas = String(valor).toLowerCase();
      
              if (valorPropiedadMinusculas.includes(valorMinusculas)) {
                this.resultados.push(objeto);
                break;
              }
            }
          }
          break;
       case 7:
          // Acciones para la opción 3
          for (let i = 0; i < this.proveedores.length; i++) {
            const objeto = this.proveedores[i];
      
            for (let key in objeto) {
              const valor = objeto[key];
              const valorPropiedadMinusculas = String(valor).toLowerCase();
      
              if (valorPropiedadMinusculas.includes(valorMinusculas)) {
                this.resultados.push(objeto);
                break;
              }
            }
          }
          break;
        case 8:
          // Acciones para la opción 3
          for (let i = 0; i < this.transportes.length; i++) {
            const objeto = this.transportes[i];
      
            for (let key in objeto) {
              const valor = objeto[key];
              const valorPropiedadMinusculas = String(valor).toLowerCase();
      
              if (valorPropiedadMinusculas.includes(valorMinusculas)) {
                this.resultados.push(objeto);
                break;
              }
            }
          }
          break;
        default:
          // Acciones por defecto si no coincide con ninguna opción
          break;
      }
    }


    submit(){



      if(this.fechaInicio != undefined && this.FechaFin!=undefined){
           

      
      this.detallereportes=[{

        }]
    let partes = this.fechaInicio.split("-")  
    let fechainicio = partes[2] + "/" + partes[1] + "/" + partes[0]+' 00:00:00,000000000'
     partes = this.FechaFin.split("-")  
    let fechafin = partes[2] + "/" + partes[1] + "/" + partes[0]+' 23:59:00,000000000'
      this.data  =[{
        fechaInicio: fechainicio,
        fechaFin: fechafin
      }]  
      
     
      this.http.post('http://localhost:3000/auth/cotizacionxfecha',this.data[0]).subscribe((data:any) => {

      if(data.status!='ERROR'){
        this.reportes=data


        this.reportes.forEach((item:any) => {          

          this.data=[{
            codigo :item.codigo
            }]            
    
            this.http.post("http://localhost:3000/auth/verdetallecotizacion",this.data[0])
            .subscribe((data:any)=> {
              
              data.forEach((dato:any) =>{

                this.detallereportes.push(dato)

              });
              this.botonDescargaReporte=true
                     
             }, error => {
              console.log(error);
            });    
         });
      }
      else{
        Swal.fire({
          title: 'No se encontraron datos!',
          
          heightAuto: false
        })


      }
       

        
       });
      }else{
        Swal.fire({
          title: 'Ingrese fechas validas!',
          
          heightAuto: false
        })
      }
       
    }

    guardarPDF() {    
      const pdf = new jsPDF();   
      
      // Obtén el elemento pdf-content del DOM
      const pdfContent = document.getElementById('pdf-content') as HTMLElement;
      if (!pdfContent) {
        console.error('Element with id "pdf-content" not found in the DOM.');
        return;
      }
         // Agregar imagen del logo
        const logoWidth = 40; // Ancho de la imagen del logo
        const logoHeight = 20; // Alto de la imagen del logo     
      
        const logoImg = new Image();
        logoImg.src = '../../../assets/img/logo.png';
        
        // Esperar a que la imagen se cargue
        logoImg.onload = () => {
          // Insertar el logo en el documento PDF
        pdf.addImage(logoImg, 'PNG', 5, 5, logoWidth, logoHeight);
          
       
        // Agregar título del PDF
        pdf.setFontSize(14);
        pdf.setFont('Helvetica', 'bold');
        pdf.text('Detalle de negocio ', 85, 13);
        pdf.text(this.fechaInicio+' y '+this.FechaFin,85,20);  
  
      //intento de tabla 
          // Obtener los datos de la tabla
          const table = document.getElementById('pdf-content') as HTMLTableElement;
          if (!table) {
            console.error('Table element not found in the DOM.');
            return;
          }
      
          const tableData = [];
      
          // Recorrer las filas de la tabla
          for (let i = 0; i < table.rows.length; i++) {
            const rowData = [];
  
             // Agregar el número de fila como primer elemento de cada fila de datos
            rowData.push(i + 1);
      
            // Recorrer las celdas de la fila actual
            for (let j = 0; j < table.rows[i].cells.length; j++) {
              const cellData = table.rows[i].cells[j].innerText;
              rowData.push(cellData);
            }
      
            tableData.push(rowData);
          }
      
          // Configurar las opciones de la tabla
          const tableOptions = {
            startY: 30, // Posición vertical inicial de la tabla
            margin: { top: 10 }, // Margen superior
          };
      
          // Dibujar la tabla en el documento PDF
          (pdf as any).autoTable({
            head: [['N','ID','Empresa', 'Código Cotización', 'Detalle cotización', 'Total']], // Encabezado de la tabla
            body:tableData, // Datos de la tabla
            ...tableOptions,
          });
           
        // Guarda el PDF generado en el cliente
        const pdfBlob = pdf.output('blob');
  
        // Crea un objeto FormData
        const formData = new FormData();
        formData.append('pdf', pdfBlob, 'DetalleNegocio-'+this.fechaInicio+'.pdf');
    
        // Envía la solicitud POST a la API
        fetch('http://localhost:3000/upload-pdf', {
          method: 'POST',
          body: formData
        })
          .then(response => {
            if (response.ok) {
              console.log('PDF enviado correctamente a la API');

              setTimeout(() => {
                let nombre='DetalleNegocio-'+this.fechaInicio
               this.downloadPDF2(nombre)  }, 1000);
            } else {
              console.error('Error al enviar el PDF a la API');
            }
          })
          .catch(error => {
            console.error('Error de red:', error);
          });
      };        
        
    }
    
    




}

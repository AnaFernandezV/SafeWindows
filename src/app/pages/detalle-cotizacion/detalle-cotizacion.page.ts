import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { StorageService } from '../../storage.service'
import 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import swal from'sweetalert2';
import { NavigationEnd, Router } from '@angular/router';
import Swal from'sweetalert2';


@Component({
  selector: 'app-detalle-cotizacion',
  templateUrl: './detalle-cotizacion.page.html',
  styleUrls: ['./detalle-cotizacion.page.scss'],
})
export class DetalleCotizacionPage implements OnInit {
  isMenuOpen =false;
  toggleMenu():void{
    this.isMenuOpen = !this.isMenuOpen;

  }
  //variable de usuario
  logeado:any=[];
  data: any[] = [{}]
  iduser:number=0
  numeropedido=Math.floor(Math.random() * 9000) + 1000;
  empresa:any=[];
  // Variables de detalle de la cotizacion
  KEY_Carrito='detalle'
  carro: any=[]
  carrodata: any[]=[]
  totalfinal:number=0

  /* islogeado:any;  */ 
  
  KEY_LOGIN = 'logins';

  //prueba de cotizacion
  nuevaCotizacion = {
    emp_coti : this.iduser,
    codigo: this.numeropedido,
    total: this.totalfinal,
    estado:''
  };
  constructor(private storageService: StorageService, private http: HttpClient,private router : Router ) { 

    
  } 
  /* LOG OUT */
async logOut(){
   
  this.storageService.eliminarid(this.KEY_LOGIN,this.logeado.id)
  swal.fire({ 
    icon: 'success',
    html: 'Cerrando Sesión',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    heightAuto: false
  }) 
  setTimeout(() => {
    this.storageService.isAuthenticated.next(false)
    // Aquí puedes agregar el código que deseas ejecutar después de la pausa de 3 segundos
    this.router.navigate(['/home'])
    
    
  }, 2000);
   
 }

 obtenerFechaYHoraActual() {
  const fechaActual = new Date();

  const opcionesFecha: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opcionesFecha);

  const opcionesHora: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const horaFormateada = fechaActual.toLocaleTimeString('es-ES', opcionesHora);

  return `Fecha: ${fechaFormateada}, Hora: ${horaFormateada}`;
}

async nombreEmpresa(){
  
  let datos = [{id:this.iduser}]

   await this.http.post("http://localhost:3000/auth/verempresa", datos[0])
  .subscribe((data:any )=> {
    this.empresa= data.foundEmp.nom_empresa
    
   

   

  
    
   }, error => {
    console.log(error);
  });

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
      pdf.text('Solicitud cotización', 85, 13);


      // Agregar texto adicional
    pdf.setFontSize(12);
      pdf.setFont('Helvetica', 'normal');
      pdf.text(this.obtenerFechaYHoraActual() , 10, 40);
      pdf.text('Cliente:' + this.empresa , 10, 50);
      
      
      pdf.setFontSize(10);
      pdf.setFont('Helvetica', 'normal');
      pdf.text('* Recuerde que esta cotizacion tiene una validez de 3 dias.', 10, 60);


    


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
          startY: 70, // Posición vertical inicial de la tabla
          margin: { top: 10 }, // Margen superior
        };
    
        // Dibujar la tabla en el documento PDF
        (pdf as any).autoTable({
          head: [['N','Ventana', 'Largo', 'Ancho', 'Instalacion', 'Cantidad', 'Precio']], // Encabezado de la tabla
          body:tableData, // Datos de la tabla
          ...tableOptions,
        });
         
      // Guarda el PDF generado en el cliente
      const pdfBlob = pdf.output('blob');

      // Crea un objeto FormData
      const formData = new FormData();
      formData.append('pdf', pdfBlob, 'cotizacion-'+this.numeropedido+'.pdf');
  
      // Envía la solicitud POST a la API
      fetch('http://localhost:3000/upload-pdf', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            console.log('PDF enviado correctamente a la API');
          } else {
            console.error('Error al enviar el PDF a la API');
          }
        })
        .catch(error => {
          console.error('Error de red:', error);
        });
    };       

    /* pdf.save('cotizacion-folio.pdf'); */
      
  }
  
  
  async ngOnInit(): Promise<void> {


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.actualizarDatos();
      }
    });

    this.logeado=await this.storageService.ObtLogeado()
    this.iduser=this.logeado.id
   

    
    
    try {
      // Llamada asíncrona a una API o servicio
     this.carro=  await this.dataCarrito()
      
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
    
    this.carro.forEach((item:any) => {
      this.carrodata.push(item)
      this.totalfinal=this.totalfinal+item[0].total
      
    });
    
  }

  async actualizarDatos() {
    
    this.logeado= await this.storageService.ObtLogeado()
    this.carro= await this.dataCarrito()
    this.totalfinal=0
    this.carro.forEach((item:any) => {
      this.carrodata.push(item)
      this.totalfinal=this.totalfinal+item[0].total
      
    });
    
  }
  async dataCarrito(){
    this.carro =await this.storageService.getDatos(this.KEY_Carrito)
    return this.carro
 }
 

 async deleteCotizacion(i:number){
  this.totalfinal=0  
  

  await this.storageService.eliminarPorPosicion('detalle',i)
  this.carro=  await this.dataCarrito()
  this.carro.forEach((item:any) => {
    this.carrodata.push(item)
    this.totalfinal=this.totalfinal+item[0].total
    
  });

}


//prueba de cotizacion
async agregarCotizacion() {


  await this.nombreEmpresa()



  this.actualizarDatos()
  this.nuevaCotizacion = {
    emp_coti : this.iduser,
    codigo: this.numeropedido,
    total: this.totalfinal,
    estado: 'En Espera'
  };
  
    this.http.post('http://localhost:3000/auth/creacotizacion', this.nuevaCotizacion)
    .subscribe(
      response => {
        //una vez se crea la cotizacion se insertan los detalles
        console.log('Cotización creada:', response);
        this.carro.forEach((item:any) => {

          let datos={
            codigo :this.numeropedido,
            ventanta:item[0].tipo,
            largo:item[0].largo,
            ancho:item[0].ancho,
            instalacion:item[0].instalacion,
            cantidad:item[0].cantidad,
            total:item[0].total
               }
    
         this.http.post('http://localhost:3000/auth/creadetallecotizacion', datos)
        .subscribe(
          response => {
        console.log('Detalle Cotización creada:', response);
          },
          error => {
            console.error('Error al crear detalle cotización:', error);
      }
         );
         });

         this.guardarPDF()
         setTimeout(() => {
      
  
          // Aquí puedes agregar el código que deseas ejecutar después de la pausa de 3 segundos
          this.downloadPDF2('cotizacion-'+this.numeropedido)
          this.storageService.eliminarTodosLosDatos('detalle')
          
        }, 2000);


        // fin detalles
      },
      error => {
        console.error('Error al crear la cotización:', error);
      }
    ); 

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
confirmarcotizacion(){

  swal.fire({
    title: '¿Desea confirmar esta cotización?',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    denyButtonText: `Cancelar`,
    heightAuto: false
  }).then((result) => {
    
    if (result.isConfirmed) {

      this.agregarCotizacion()
      swal.fire({ 
        icon: 'success',
        html: 'Confirmando... La descarga del pdf iniciara automáticamente..',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        heightAuto: false
        
      })
    } else if (result.isDenied) {
      
    }
  })
}


DeleteDetalle(i: number){


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
        text: "Se a Eliminado El detalle",
        heightAuto: false
      })
      
     this.deleteCotizacion(i)
}
  })

  
}

}
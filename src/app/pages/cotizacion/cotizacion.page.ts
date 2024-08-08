import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../../storage.service'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import swal from'sweetalert2';
import * as $ from 'jquery';


@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.page.html',
  styleUrls: ['./cotizacion.page.scss'],
})
export class CotizacionPage implements OnInit {
  isMenuOpen =false;
  toggleMenu():void{
    this.isMenuOpen = !this.isMenuOpen;

  }
  KEY_Carrito='detalle'

  estructural :any = [
  ]

  vidrio :any = [
  ]
  largo!: number;
  ancho!: number;
  selectedOption!: {nombre:string,valor:number};
  selectedVidrio!: {nombre:string,valor:number};
  selectedInstalacion!: number;
  cantidad!: number;
  precioFinal!:number;
  precioInstalacionFinal: number = 0;
  precioInstalacion: number = 0;
  id!:any;
  isvalid: boolean = false; 

  carro: any=[]
  catalogos:any=[]

  constructor(private http: HttpClient, private storage: StorageService,private route: ActivatedRoute,private router : Router,private storageService: StorageService) { }
  private httpSubscription: Subscription | undefined;
  materiales:any=[];

  catalogo:any=[];
  data: any[] = [
    {
      
    }

    ]
    nombrefoto:any;
    nombrecatalogo:any;


    logeado:any; 


  
 async  ngOnInit() {



  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.actualizarDatos();
    }
  });

  this.logeado= await this.storageService.ObtLogeado()
    //obtiene id de la url

    this.id =Number(this.route.snapshot.paramMap.get('id') ) 
     // variable para buscar empresa
     this.data = [
      {
        id: this.id
        
      }
  
    ]
    //obtiene datos del catalogo para el extra
    await this.dataCatalogo()
    await this.datamaterial()   

    //obtiene datos de los materiales para listarlos   
  
  }

  instalation = [
    { texto: 'SI', valor: 10000 },
    { texto: 'NO', valor: 0 }
  ];
 
  PrecioMateriales(materiales:any){
    materiales.array.forEach((item:any) => {
      console.log(item)
      
    });

    }


    async actualizarDatos() {
      console.log('checkeo')
      this.logeado= await this.storageService.ObtLogeado()
      
    }
    async dataCatalogo(){

      this.httpSubscription=this.http.get('http://localhost:3000/catalogos').subscribe((data:any)=> {
        this.catalogos=data
       this.catalogos.forEach((item:any) =>{

        if(item.id == this.id){

         
           this.catalogo= item.extra
          this.nombrefoto=item.imagen
          this.nombrecatalogo=item.nom_cata 
          

        }
       })
        
        
         
        });
     }
    async datamaterial(){
      this.httpSubscription=this.http.get('http://localhost:3000/materiales').subscribe((data:any)=> {
      this.materiales=data
      this.materiales.forEach((items:any) =>{
        
        
        if(items.tipo == 'Estructural'){
          this.estructural.push(items)
          
        }else if(items.tipo == 'Vidrio'){
          this.vidrio.push(items)
          

        }
      
        
      
      })
      
    });

    }


  calcular() {
    let vidrio=(this.largo/100*this.ancho/100) * this.selectedVidrio.valor
    let estructura = (((this.largo/100)*4 ) + ((this.ancho/100)*2) ) *  (Number(this.selectedOption.valor))
    this.precioFinal= ((estructura+vidrio*this.cantidad)+ Number(this.selectedInstalacion*this.cantidad))+this.catalogo
    this.precioFinal = Number(this.precioFinal.toFixed(0))
    this.isvalid=true;
  }


  agregarCarrito(){
    let AgrCarro=[]
    AgrCarro=[
      {

        'tipo' : 'Ventana de :'+this.selectedOption.nombre+' y '+this.selectedVidrio.nombre+', TIPO: '+this.nombrecatalogo,
        'largo' : this.largo,
        'ancho' : this.ancho,
        'estructural' : (Number(this.selectedOption.valor)),
        'vidrio' : (Number(this.selectedVidrio.valor)),
        'instalacion': (Number(this.selectedInstalacion)),
        'cantidad': this.cantidad,
        'total' : this.precioFinal}
        
    ]

    this.storage.agregarCarro(this.KEY_Carrito, AgrCarro) 
    swal.fire({ 
      icon: 'success',
      html: 'Agregado Correctamente',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      heightAuto: false
      
    })
    this.isvalid=false;

  }
  getImagenUrl(nombreImagen: string): string {
    return 'http://localhost:3000/uploads/' + nombreImagen;
  }
  

  async logOut(){
   
    this.storageService.eliminarid('logins',this.logeado.id)
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

  
}

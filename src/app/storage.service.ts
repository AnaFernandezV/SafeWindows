import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 import { BehaviorSubject } from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class StorageService {
    //variables a utilizar
    dato : any[]=[];
    datos : any [] = [];
    data: any[] = [{ }]
    tipo:any;
    logeado:any=[];
    esperar:any;
    KEY_LOGIN = 'logins';
  

    //VARIABLE DE ESTADO DE LOGIN
  isAuthenticated = new BehaviorSubject(false);
  

  constructor(private storage: Storage,private http: HttpClient) { 
    storage.create ();
  }


   //metodos del crud del storage

   async agregar (key:any,dato:any){
    this.datos = await this.storage.get(key) || [];
    

    this.dato = await this.getDato (key, dato.id);
    if (this.dato == undefined) {
      this.datos.push(dato);
      await this.storage.set(key, this.datos);
      return true;
    }
    return false;
    

   } 

   // FUnciones de carro

   async agregarCarro (key:any,dato:any){
    this.datos = await this.storage.get(key) || [];
    
    this.datos.push(dato);
    await this.storage.set(key, this.datos);
    return true;
    

   } 

   async getDatoCarro (key:any, identificador:any){
    this.datos = await this.storage.get (key) || [];
    this.dato = this.datos.find (Carro => Carro.id == identificador);
    console.log(key); 
    console.log(identificador); 
    console.log(this.datos); 

    return this.dato;
    
  }

   //Variables de AuthGuard
   getAuth(){
    return this.isAuthenticated.value;
  }



   async getDato (key:any, identificador:any){
    this.datos = await this.storage.get (key) || [];
    this.dato = this.datos.find (persona => persona.id == identificador);

    return this.dato;
    
  }
  async getDatos (key:any): Promise<any[]>{
    this.datos = await this.storage.get (key) || [];
    
    return this.datos
    
  }
   async eliminar (key:any , dato:any){

    console.log(dato)
    this.datos = await this.storage.get (key) || [];
    this.datos.forEach ((value, index) => {
      if (value.username == dato) {
        this.datos.splice (index,1);
      }
    });
    await this.storage.set (key,this.datos);
    
  }

  async eliminarid (key:any , dato:any){

    console.log(dato)
    this.datos = await this.storage.get (key) || [];
    this.datos.forEach ((value, index) => {
      if (value.id == dato) {
        this.datos.splice (index,1);
      }
    });
    await this.storage.set (key,this.datos);
    
  }

  async actualizar (key:any, dato:any) {
    this.datos = await this.storage.get (key) || [];

    var index = this.datos.findIndex (persona => persona.id == dato.id);
    console.log(this.datos);
    console.log(dato);
    console.log(index);
    this.datos [index] = dato ;

   await this.storage.set(key, this.datos);
  }

  

 /*  getAuth () {
    return this.isAuthenticated.value;
  } */

 /*  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }  */

  async validarUser ( email:any, pass:any){
    this.datos = await this.storage.get ("personas") || [];
    
    var usuario_login = this.datos.find(u => u.email == email && u.password == pass);

    if (usuario_login != undefined) {
      console.log(usuario_login.correo)
      //PARA CAMBIAR EL VALOR A UN BehaviorSubject SE UTILIZA EL METODO .next(valor);
      
      /* this.isAuthenticated.next(true); */
      return usuario_login;
    }

    
  }

  async validarID(id:any){
    this.datos = await this.storage.get ("logins") || [];
    return this.datos.find(u => u.id == id);  
    //return this.usuarios.find(u => u.email == email);
  }

  async eliminarPorPosicion(key: any, posicion: number) {
    this.datos = await this.storage.get(key) || [];
  
    if (posicion >= 0 && posicion < this.datos.length) {
      this.datos.splice(posicion, 1);
      await this.storage.set(key, this.datos);
      return true;
    }
  
    return false;
  }

  async eliminarTodosLosDatos(key: any) {
    await this.storage.remove(key);
  }

  async ObtLogeado(){
    
    this.logeado = await this.getDatos(this.KEY_LOGIN)
    //Si hay datos de persona logeada
    if(this.logeado[0]){
      
       return await this.obtenerDatos(this.logeado[0].id)
    }else{

      this.tipo = {
        id: 0,
        tipo: 'user',
      };
      return await this.tipo


    }
    
   
  
    
 }
 obtenerDatos(id:any) {
  
  return new Promise((resolve, reject) => {


    // Crear un objeto de datos con el ID proporcionado
    this.data = [{ id: id }];
    
    // Realizar una solicitud HTTP POST al servidor
    this.http.post("http://localhost:3000/auth/vercredencial", this.data[0])
      .subscribe((data: any) => {

        
        // Verificar si se encontraron datos
        if (data && data.foundEmp) {
          // En caso de que se encuentren datos, procesarlos
          this.tipo = {
            id: data.foundEmp.id,
            tipo: data.foundEmp.tipo,
          };
        } else {
          // En caso de que no se encuentren datos, establecer los valores predeterminados
          this.tipo = {
            id: 0,
            tipo: 'user',
          };
        }
        
        // Resolver la promesa con los datos procesados
        resolve(this.tipo);
      }, error => {
        // En caso de error, rechazar la promesa con el error recibido
        reject(error);
      });
  });
}
}

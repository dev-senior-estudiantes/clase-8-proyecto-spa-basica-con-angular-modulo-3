// Importando el Decorador Injectable para definir la clase como un servicio injectable
import { Injectable } from '@angular/core';
// Importando httpClient para poder peticiones HTTP - GET, POST...
import { HttpClient } from '@angular/common/http';
// ES el itpo de dato que devuelve angular para manejar respuestas asíncronas
import { Observable } from 'rxjs';
// Importamos la interfaz estudiante, par definir la estructura de los datos a manejar.
import { Estudiantes } from '../models/estudiantes.model';


// Ese indica que el este servicio estaá disponoble a nivel global en la app
@Injectable({
  providedIn: 'root'
})
export class EstudiantesServices {

  // URL base de la API REST  que estamos utilizando.
  // Api de prueba que llama a Json Place Holder.
  private apiurl = 'http://jsonplaceholder.typicode.com/users'

  // Injectamos el servicio HttpClient para las peticiones HTTP
  constructor(private http: HttpClient) {}


  /* 
  Obetner la lista de todos los estudiantes
  Retorna un observable que contiene un array de objetos Estudiantes
   */
  getEstudiantes(): Observable<Estudiantes[]> {
    return this.http.get<Estudiantes[]>(this.apiurl);
  }
  

 /*  @param estudiantes - objeto Estudiante que queremos GuardsCheckStart. 
  Retornar un observable con la respuesta de la api del estudiante creado. 
  */
  crearEstudiantes(estudiante:Estudiantes): Observable<Estudiantes> {
    return this.http.post<Estudiantes>(this.apiurl, estudiante)
  }
}

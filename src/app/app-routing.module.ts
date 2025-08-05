import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// Importar componentes asociados a las rutas o que estaran asociados
import { Home } from './pages/home/home';
import { Estudiantes } from './pages/estudiantes/estudiantes';
import { EstudiantesDetalle } from './pages/estudiantes-detalle/estudiantes-detalle';
import { EstudiantesForm } from './pages/estudiantes-form/estudiantes-form';

const routes: Routes = [
  { path: '', component: Home }, // Ruta raiz localhost 4200 para el home.
  { path: 'estudiantes', component: Estudiantes }, // Ruta de estudiantes lista.
  { path: 'estudiantes/:id', component: EstudiantesDetalle }, // Ruta detalle.
  { path: 'nuevo', component: EstudiantesForm }, // Ruta Estudiante nuevo.
];

// Declaramos un módulo de Angular con el decorador @ NgModule
@NgModule({
  imports: [RouterModule.forRoot(routes)], // para iniciar con las rutas.
  exports: [RouterModule], // para que disponible y usar.
})

// Definimos el nombre del módulo de rutas.
export class ApRoutingModule {}

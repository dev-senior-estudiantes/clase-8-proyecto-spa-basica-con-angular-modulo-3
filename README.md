# EstudiantesApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

## Guía paso a paso para crear una SPA básica en Angular

A continuación te guiaré paso a paso para crear un proyecto básico en Angular integrando todos los temas de las clases que mencionaste. Este mini-proyecto será una SPA (Single Page Application) que permita:

- Listar estudiantes.
- Ver detalles de un estudiante.
- Crear/editar un estudiante con formularios reactivos.
- Usar un servicio para conectarse a una API REST ficticia.

### PASO 1: Crear el proyecto

Usa Angular CLI para crear el proyecto:

```bash
ng new estudiantes-app --routing --style=css
```

### PASO 2: Crear componentes (Clase 2: Componentes y plantillas)

Crea los componentes principales:

```bash
ng generate component pages/estudiantes
ng generate component pages/estudiantes-detalle
ng generate component pages/estudiantes-form
```

### PASO 3: Crear modelo y servicio (Clase 4 y 7)

- Modelo del estudiante: `src/app/models/estudiante.model.ts`
- Servicio para conectar con una API REST: `src/app/services/estudiante.service.ts`

Ejemplo básico del servicio:

```typescript
// src/app/services/estudiante.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Estudiante } from "../models/estudiante.model";

@Injectable({ providedIn: "root" })
export class EstudianteService {
  private apiUrl = "https://api.ejemplo.com/estudiantes";

  constructor(private http: HttpClient) {}

  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }
  // Métodos para obtener, crear, editar, eliminar estudiantes
}
```

### PASO 4: Configurar rutas (Clase 5)

Edita `src/app/app-routing.module.ts` para definir las rutas principales:

```typescript
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "estudiantes", component: EstudiantesComponent },
  { path: "estudiantes/:id", component: EstudiantesDetalleComponent },
  { path: "nuevo", component: EstudiantesFormComponent },
];
```

### PASO 5: Mostrar lista (Clase 3: Data binding y directivas)

Código básico en `estudiantes.component.ts`:

```typescript
estudiantes: Estudiante[] = [];
ngOnInit() {
  this.servicio.getEstudiantes().subscribe(data => this.estudiantes = data);
}
```

HTML (`estudiantes.component.html`):

```html
<ul>
  <li *ngFor="let estudiante of estudiantes">
    {{ estudiante.nombre }}
    <a [routerLink]="['/estudiantes', estudiante.id]">Ver detalle</a>
  </li>
</ul>
```

### PASO 6: Ver detalle (Data binding + rutas)

En `estudiantes-detalle.component.ts`:

```typescript
id: string;
estudiante: Estudiante;
ngOnInit() {
  this.id = this.route.snapshot.paramMap.get('id');
  this.servicio.getEstudiante(this.id).subscribe(data => this.estudiante = data);
}
```

### PASO 7: Formularios reactivos y validaciones (Clase 6)

Importa en `app.module.ts`:

```typescript
import { ReactiveFormsModule } from "@angular/forms";
```

Y en imports:

```typescript
imports: [ReactiveFormsModule];
```

En `estudiantes-form.component.ts`:

```typescript
form: FormGroup;
constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    nombre: ['', Validators.required],
    // otros campos
  });
}
```

HTML:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="nombre" />
  <button type="submit">Guardar</button>
</form>
```

---

## Clases y pasos desarrollados y faltantes

**Desarrollados:**

- Clase 2: Componentes y plantillas
- Clase 3: Data binding y directivas
- Clase 4: Modelo
- Clase 5: Rutas
- Clase 6: Formularios reactivos y validaciones
- Clase 7: Servicios y conexión a API REST

**Faltantes para terminar el proyecto:**

- Implementar la lógica completa de edición y creación de estudiantes
- Validaciones avanzadas en formularios
- Manejo de errores en servicios
- Integración con una API REST real o mock
- Mejorar la experiencia de usuario (feedback visual, loading, etc.)

¡Sigue estos pasos y completa los puntos faltantes para tener tu SPA funcional! Si tienes dudas, consulta la documentación oficial de Angular o pregunta en el chat.

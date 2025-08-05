import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesDetalle } from './estudiantes-detalle';

describe('EstudiantesDetalle', () => {
  let component: EstudiantesDetalle;
  let fixture: ComponentFixture<EstudiantesDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiantesDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(EstudiantesDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

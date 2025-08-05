import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesForm } from './estudiantes-form';

describe('EstudiantesForm', () => {
  let component: EstudiantesForm;
  let fixture: ComponentFixture<EstudiantesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiantesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

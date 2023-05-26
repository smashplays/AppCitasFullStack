import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarEmpleadoComponent } from './generar-empleado.component';

describe('GenerarEmpleadoComponent', () => {
  let component: GenerarEmpleadoComponent;
  let fixture: ComponentFixture<GenerarEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

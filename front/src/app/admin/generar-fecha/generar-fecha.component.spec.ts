import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarFechaComponent } from './generar-fecha.component';

describe('GenerarFechaComponent', () => {
  let component: GenerarFechaComponent;
  let fixture: ComponentFixture<GenerarFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarFechaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

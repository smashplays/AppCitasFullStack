import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarHoraComponent } from './generar-hora.component';

describe('GenerarHoraComponent', () => {
  let component: GenerarHoraComponent;
  let fixture: ComponentFixture<GenerarHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarHoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

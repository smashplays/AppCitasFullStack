import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoHorasComponent } from './listado-horas.component';

describe('ListadoHorasComponent', () => {
  let component: ListadoHorasComponent;
  let fixture: ComponentFixture<ListadoHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoHorasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

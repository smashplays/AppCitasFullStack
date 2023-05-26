import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFechasComponent } from './listado-fechas.component';

describe('ListadoFechasComponent', () => {
  let component: ListadoFechasComponent;
  let fixture: ComponentFixture<ListadoFechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoFechasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

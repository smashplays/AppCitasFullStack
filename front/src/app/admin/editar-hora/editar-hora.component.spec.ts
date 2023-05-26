import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHoraComponent } from './editar-hora.component';

describe('EditarHoraComponent', () => {
  let component: EditarHoraComponent;
  let fixture: ComponentFixture<EditarHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarHoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

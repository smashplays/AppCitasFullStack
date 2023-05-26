import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletCitaComponent } from './outlet-cita.component';

describe('OutletCitaComponent', () => {
  let component: OutletCitaComponent;
  let fixture: ComponentFixture<OutletCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletCitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutletCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletAdminComponent } from './outlet-admin.component';

describe('OutletAdminComponent', () => {
  let component: OutletAdminComponent;
  let fixture: ComponentFixture<OutletAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutletAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletAuthComponent } from './outlet-auth.component';

describe('OutletAuthComponent', () => {
  let component: OutletAuthComponent;
  let fixture: ComponentFixture<OutletAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutletAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarAdminComponent } from './configurar-admin.component';

describe('ConfigurarAdminComponent', () => {
  let component: ConfigurarAdminComponent;
  let fixture: ComponentFixture<ConfigurarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurarAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

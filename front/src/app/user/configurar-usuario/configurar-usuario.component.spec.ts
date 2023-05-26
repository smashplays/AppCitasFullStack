import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarUsuarioComponent } from './configurar-usuario.component';

describe('ConfigurarUsuarioComponent', () => {
  let component: ConfigurarUsuarioComponent;
  let fixture: ComponentFixture<ConfigurarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

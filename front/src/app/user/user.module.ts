import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletUserComponent } from './outlet-user/outlet-user.component';
import { ListadoCitasComponent } from './listado-citas/listado-citas.component';
import { ConfigurarUsuarioComponent } from './configurar-usuario/configurar-usuario.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarCitaComponent } from './editar-cita/editar-cita.component';

@NgModule({
  declarations: [
    OutletUserComponent,
    ListadoCitasComponent,
    ConfigurarUsuarioComponent,
    EditarCitaComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}

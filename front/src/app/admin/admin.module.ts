import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { ListadoEmpleadosComponent } from './listado-empleados/listado-empleados.component';
import { OutletAdminComponent } from './outlet-admin/outlet-admin.component';
import { ConfigurarAdminComponent } from './configurar-admin/configurar-admin.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { GenerarEmpleadoComponent } from './generar-empleado/generar-empleado.component';
import { ListadoServiciosComponent } from './listado-servicios/listado-servicios.component';
import { GenerarServicioComponent } from './generar-servicio/generar-servicio.component';
import { EditarServicioComponent } from './editar-servicio/editar-servicio.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ListadoFechasComponent } from './listado-fechas/listado-fechas.component';
import { ListadoHorasComponent } from './listado-horas/listado-horas.component';
import { GenerarFechaComponent } from './generar-fecha/generar-fecha.component';
import { GenerarHoraComponent } from './generar-hora/generar-hora.component';
import { EditarFechaComponent } from './editar-fecha/editar-fecha.component';
import { EditarHoraComponent } from './editar-hora/editar-hora.component';

@NgModule({
  declarations: [
    ListadoClientesComponent,
    ListadoUsuariosComponent,
    ListadoEmpleadosComponent,
    OutletAdminComponent,
    ConfigurarAdminComponent,
    EditarEmpleadoComponent,
    GenerarEmpleadoComponent,
    ListadoServiciosComponent,
    GenerarServicioComponent,
    EditarServicioComponent,
    EditarClienteComponent,
    ListadoFechasComponent,
    ListadoHorasComponent,
    GenerarFechaComponent,
    GenerarHoraComponent,
    EditarFechaComponent,
    EditarHoraComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}

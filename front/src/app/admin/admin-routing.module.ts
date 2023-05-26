import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletAdminComponent } from './outlet-admin/outlet-admin.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { ConfigurarAdminComponent } from './configurar-admin/configurar-admin.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { ListadoEmpleadosComponent } from './listado-empleados/listado-empleados.component';
import { RoleGuard } from '../shared/guards/role.guard';
import { AuthGuard } from '../shared/guards/auth.guard';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { GenerarEmpleadoComponent } from './generar-empleado/generar-empleado.component';
import { ListadoServiciosComponent } from './listado-servicios/listado-servicios.component';
import { GenerarServicioComponent } from './generar-servicio/generar-servicio.component';
import { EditarServicioComponent } from './editar-servicio/editar-servicio.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ListadoFechasComponent } from './listado-fechas/listado-fechas.component';
import { ListadoHorasComponent } from './listado-horas/listado-horas.component';
import { GenerarFechaComponent } from './generar-fecha/generar-fecha.component';
import { EditarFechaComponent } from './editar-fecha/editar-fecha.component';
import { GenerarHoraComponent } from './generar-hora/generar-hora.component';
import { EditarHoraComponent } from './editar-hora/editar-hora.component';

const routes: Routes = [
  {
    path: '',
    component: OutletAdminComponent,
    children: [
      {
        path: 'config',
        component: ConfigurarAdminComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'usuarios',
        component: ListadoUsuariosComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'citas',
        component: ListadoClientesComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'citas/editar/:id',
        component: EditarClienteComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'empleados',
        component: ListadoEmpleadosComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'fechas',
        component: ListadoFechasComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'fechas/generar',
        component: GenerarFechaComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'fechas/editar/:id',
        component: EditarFechaComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'horas',
        component: ListadoHorasComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'horas/generar',
        component: GenerarHoraComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'horas/editar/:id',
        component: EditarHoraComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'empleados/generar',
        component: GenerarEmpleadoComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'empleados/editar/:id',
        component: EditarEmpleadoComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'servicios',
        component: ListadoServiciosComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'servicios/generar',
        component: GenerarServicioComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'servicios/editar/:id',
        component: EditarServicioComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: '**',
        redirectTo: 'config',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

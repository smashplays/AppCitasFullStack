import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletUserComponent } from './outlet-user/outlet-user.component';
import { ConfigurarUsuarioComponent } from './configurar-usuario/configurar-usuario.component';
import { ListadoCitasComponent } from './listado-citas/listado-citas.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserGuard } from '../shared/guards/user.guard';
import { EditarCitaComponent } from './editar-cita/editar-cita.component';

const routes: Routes = [
  {
    path: '',
    component: OutletUserComponent,
    children: [
      {
        path: 'config',
        component: ConfigurarUsuarioComponent,
        canActivate: [AuthGuard, UserGuard],
      },
      {
        path: 'citas',
        component: ListadoCitasComponent,
        canActivate: [AuthGuard, UserGuard],
      },
      {
        path: 'citas/editar/:id',
        component: EditarCitaComponent,
        canActivate: [AuthGuard, UserGuard],
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
export class UserRoutingModule {}

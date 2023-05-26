import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletCitaComponent } from './outlet-cita/outlet-cita.component';
import { FormularioCitaComponent } from './formulario-cita/formulario-cita.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserGuard } from '../shared/guards/user.guard';

const routes: Routes = [
  {
    path: '',
    component: OutletCitaComponent,
    children: [
      {
        path: 'formulario',
        component: FormularioCitaComponent,
        canActivate: [AuthGuard, UserGuard],
      },
      {
        path: '**',
        redirectTo: 'formulario',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateRoutingModule {}

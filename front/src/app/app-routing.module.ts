import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),
  },
  {
    path: 'date',
    loadChildren: () =>
      import('./date/date-routing.module').then((m) => m.DateRoutingModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user-routing.module').then((m) => m.UserRoutingModule),
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

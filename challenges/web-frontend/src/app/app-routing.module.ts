import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth/auth.guard';
import { RolesGuard } from './auth/guards/roles/roles.guard';

import { LayoutComponent } from 'src/app/shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./auth/auth.module').then((module) => module.AuthModule),
      },
      {
        path: 'auctions',
        canLoad: [AuthGuard],
        canActivate: [RolesGuard],
        data: {
          allowedRoles: ['salesman'],
        },
        loadChildren: () =>
          import('./auctions/auctions.module').then(
            (module) => module.AuctionsModule
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

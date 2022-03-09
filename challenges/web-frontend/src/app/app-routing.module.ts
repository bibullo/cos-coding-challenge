import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth/auth.guard';
import { RolesGuard } from './auth/guards/roles/roles.guard';

import { LayoutComponent } from 'src/app/shared/components/layout/layout.component';
import { SampleScreenComponent } from './shared/components/sample-screen/sample-screen.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: SampleScreenComponent,
        data: {
          title: 'Home',
          subtitle: 'Landing Page',
          illustration: '/assets/logo.svg',
        },
      },
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
        path: '404',
        component: SampleScreenComponent,
        data: {
          title: '404',
          subtitle: 'Not Found',
          illustration: '/assets/logo.svg',
        },
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

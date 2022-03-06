import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from 'src/app/shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./auth/auth.module').then((module) => module.AuthModule),
      },
      {
        path: 'auctions',
        loadChildren: () =>
          import('./auctions/auctions.module').then(
            (module) => module.AuctionsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Routes} from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import {AuthGuard} from "./guards/auth..guard";

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
       {
        path: 'component',
        canActivate: [AuthGuard],
         loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  },
  {
    path: 'registration',
    loadChildren: () => import('./core/authentication/registration/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./core/authentication/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

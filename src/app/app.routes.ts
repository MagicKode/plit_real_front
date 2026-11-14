import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { authGuard } from './core/auth-guard';
import { AdminGalleryComponent } from './components/admin-gallery/admin-gallery';

export const routes: Routes = [
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'admin/gallery', component: AdminGalleryComponent, canActivate: [authGuard] },
];

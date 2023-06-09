import { MenuComponent } from './menu/menu.component';
import { TypeRetardComponent } from './type-retard/type-retard.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { ArticleComponent } from './article/article.component';
import { ContratComponent } from './contrat/contrat.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { ContratDashboardComponent } from './contrat-dashboard/contrat-dashboard.component';
import { UpdateContratComponent } from './update-contrat/update-contrat.component';
import { AffichageVolComponent } from './affichage-vol/affichage-vol.component';
import { AddRetardComponent } from './add-retard/add-retard.component';
import { DashboardRetardComponent } from './dashboard-retard/dashboard-retard.component';
import { LoginComponent } from './Auth/login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './Auth/auth.guard';
import { ProfilComponent } from './profil/profil.component';
import { RoleComponent } from './role/role.component';
import { BonPrestationComponent } from './bon-prestation/bon-prestation.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'AdminDashboard',
    component: DashboardAdminComponent,
    children: [
      { path: 'utilisateurs', component: UtilisateurComponent },
      { path: 'fournisseurs', component: FournisseurComponent },
      { path: 'articles', component: ArticleComponent },
      { path: 'typeRetard', component: TypeRetardComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'contrat', component: ContratComponent },
      { path: 'role', component: RoleComponent },
      { path: 'menuDetail', component: MenuDetailComponent },
      { path: 'ContratDashboard', component: ContratDashboardComponent },
      { path: 'updateContrat', component: UpdateContratComponent },
      { path: 'ContratDashboard', component: ContratDashboardComponent },
      { path: 'updateContrat', component: UpdateContratComponent },
    ],

    canActivate: [AuthGuard],
    data: { role: ['Admin'] },
  },

  {
    path: 'affichageVol',
    component: AffichageVolComponent,
    canActivate: [AuthGuard],
    data: { role: ['Chef d’escale'] },
  },
  {
    path: 'addRetard',
    component: AddRetardComponent,
    canActivate: [AuthGuard],
    data: { role: ['Chef d’escale'] },
  },
  {
    path: 'dashboardRetard',
    component: DashboardRetardComponent,
    canActivate: [AuthGuard],
    data: { role: ['Agent de comptoir'] },
  },
  {
    path: 'bonPrestation',
    component: BonPrestationComponent,
    canActivate: [AuthGuard],
    data: { role: ['Agent de comptoir'] },
  },
  { path: 'forbidden', component: ForbiddenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

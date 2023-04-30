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

const routes: Routes = [
  { path: '', redirectTo: 'utilisateurs', pathMatch: 'full' },
  { path: 'utilisateurs', component: UtilisateurComponent },
  { path: 'fournisseurs', component: FournisseurComponent },
  { path: 'articles', component: ArticleComponent },
  { path: 'typeRetard', component: TypeRetardComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'contrat', component: ContratComponent },
  { path: 'menuDetail', component: MenuDetailComponent },
  { path: 'ContratDashboard', component: ContratDashboardComponent },
  { path: 'updateContrat', component: UpdateContratComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { TypeRetardComponent } from './type-retard/type-retard.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  { path: '', redirectTo: 'utilisateurs', pathMatch: 'full' },
  { path: 'utilisateurs', component: UtilisateurComponent },
  { path: 'fournisseurs', component: FournisseurComponent },
  { path: 'articles', component: ArticleComponent },
  { path: 'typeRetard', component: TypeRetardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

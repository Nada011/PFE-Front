import { UtilisateurService } from './Services/utilisateur.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { ArticleComponent } from './article/article.component';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { TypeRetardComponent } from './type-retard/type-retard.component';
import { MenuComponent } from './menu/menu.component';
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
import { AuthInterceptor } from './Auth/auth.iterceptor';
import { ProfilComponent } from './profil/profil.component';
import { RoleComponent } from './role/role.component';
import { BonPrestationComponent } from './bon-prestation/bon-prestation.component';

@NgModule({
  declarations: [
    AppComponent,
    UtilisateurComponent,
    FournisseurComponent,
    ArticleComponent,
    DashboardAdminComponent,
    SideBarComponent,
    NavBarComponent,
    TypeRetardComponent,
    MenuComponent,
    ContratComponent,
    MenuDetailComponent,
    ContratDashboardComponent,
    UpdateContratComponent,
    AffichageVolComponent,
    AddRetardComponent,
    DashboardRetardComponent,
    LoginComponent,
    ForbiddenComponent,
    ProfilComponent,
    RoleComponent,
    BonPrestationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UtilisateurService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

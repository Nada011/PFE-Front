import { UtilisateurService } from './utilisateur/utilisateur.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
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



@NgModule({
  declarations: [
    AppComponent,
    UtilisateurComponent,
    FournisseurComponent,
    ArticleComponent,
    DashboardAdminComponent,
    SideBarComponent,
    NavBarComponent,
    TypeRetardComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,
    HttpClientModule, FormsModule,ReactiveFormsModule
  ],
  providers: [UtilisateurService],
  bootstrap: [AppComponent]
})
export class AppModule { }

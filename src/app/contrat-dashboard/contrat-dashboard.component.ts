import { Fournisseur } from './../fournisseur/fournisseur';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contrat } from '../contrat/contrat';
import { FournisseurService } from '../Services/fournisseur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratService } from '../Services/contrat.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-contrat-dashboard',
  templateUrl: './contrat-dashboard.component.html',
  styleUrls: ['./contrat-dashboard.component.css'],
})
export class ContratDashboardComponent implements OnInit {
  public contrats: any[];
  public Fournisseurs: any[];
  public editContrat: any;
  public deleteContrat: any;
  public Contratt: Contrat | null;
  editForm: FormGroup;
  public Contrat: any;
  filtredContrats: any[];
  filterText: String = '';
  constructor(
    //private MenuService: MenuService,
    // private MenuDetailService: MenuDetailService,
    //private route: ActivatedRoute,
    private FournisseurService: FournisseurService,
    private router: Router,
    private ContratService: ContratService,
    private fb: FormBuilder //  private ArticleService: ArticleService,
  ) {}
  // NgOnInit
  ngOnInit() {
    this.getAllContrats();
    this.getAllFournisseurs();

    this.editForm = this.fb.group({
      dateDebut: [''],
      dateFin: [''],
      menu: this.fb.group({
        titre: [''],
        details: this.fb.array([]),
      }),

      fournisseur: [null, Validators.required],
    });
    this.editForm.valueChanges.subscribe;
  }
  // redirect to page contrat to add contrat
  redirectTo(page: String, object: any) {
    if (page == 'addContrat') {
      this.router.navigate(['AdminDashboard/contrat']);
    }
    if (page == 'updateMenuDetail') {
      sessionStorage.setItem('Menu', JSON.stringify(object));
      const button = document.getElementById('Quitter');
      button?.click();
      this.router.navigate(['AdminDashboard/updateContrat']);
    }
  }
  //set filter text
  setFilterText(value: String) {
    this.filterText = value;
    this.filtredContrats = this.filter(value);
  }
  ///filter
  filter(fournisseurNom: String) {
    if (this.contrats.length === 0 || this.filterText === '') {
      return this.contrats;
    } else {
      return this.contrats.filter((Contrat) => {
        return Contrat.fournisseurNom
          .toLowerCase()
          .match(fournisseurNom.toLowerCase());
      });
    }
  }
  setContrats(value: any) {
    this.Contrat = value;
  }
  // GET FOURNISSEURS
  public getAllFournisseurs(): void {
    this.FournisseurService.getAllFournisseurs().subscribe(
      (response: Fournisseur[]) => {
        this.Fournisseurs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // GET CONTRATS
  public getAllContrats(): void {
    this.ContratService.getAllContrats().subscribe(
      (response: Contrat[]) => {
        this.contrats = response;

        this.filtredContrats = this.contrats;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //Delete Contrat
  public onDelete(Id: number): void {
    this.ContratService.deleteContrat(Id).subscribe(
      (response: void) => {
        this.getAllContrats();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //Edit Contrat
  public onEdit(contrat: Contrat): void {
    this.ContratService.updateContrat(contrat).subscribe(
      (response: Contrat) => {
        this.getAllContrats();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //Modal
  public onOpenModal(Contrat: any, mode: string): void {
    const conatainer = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'MenuList') {
      button.setAttribute('data-target', '#MenuList');
    }
    if (mode === 'edit') {
      this.editContrat = Contrat;

      button.setAttribute('data-target', '#edit');
    }
    if (mode === 'delete') {
      this.deleteContrat = Contrat;
      button.setAttribute('data-target', '#delete');
    }
    if (mode === 'ArticleList') {
      button.setAttribute('data-target', '#ArticleList');
    }

    if (mode === 'ContrtatDetails') {
      this.Contratt = Contrat;
      button.setAttribute('data-target', '#ContrtatDetails');
    }
    conatainer?.appendChild(button);
    button.click();
  }
}

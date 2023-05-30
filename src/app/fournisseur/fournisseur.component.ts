import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Fournisseur } from './fournisseur';
import { FournisseurService } from '../Services/fournisseur.service';
import { ContratService } from '../Services/contrat.service';
import { Contrat } from '../contrat/contrat';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css'],
})
export class FournisseurComponent implements OnInit {
  public fournisseurs: Fournisseur[];
  public editFournisseur: Fournisseur | null;
  public deleteFournisseur: Fournisseur | null;
  public fournisseurr: any;

  addForm: FormGroup;
  deleteContrat: any;
  contrats: Contrat[];
  private _token: Fournisseur;
  constructor(
    private FournisseurService: FournisseurService,
    private fb: FormBuilder,
    private ContratService: ContratService
  ) {}

  ngOnInit() {
    this.getAllFournisseurs();
    this.addForm = this.fb.group({
      nom: ['', Validators.required],
      numTel: [null, [Validators.required]],
      fax: [null],
      adresse: ['', [Validators.required]],
      codePostal: ['', [Validators.required]],

      ville: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.minLength(4), Validators.email],
      ],
    });
  }

  public onDeleteContrat(Id: number): void {
    this.ContratService.deleteContrat(Id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllContrats();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAllContrats(): void {
    this.ContratService.getAllContrats().subscribe(
      (response: Contrat[]) => {
        this.contrats = response;
        console.log(this.contrats);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAllFournisseurs(): void {
    this.FournisseurService.getAllFournisseurs().subscribe(
      (response: Fournisseur[]) => {
        this.fournisseurs = response;
        console.log(this.fournisseurs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAdd(addForm: FormGroup): void {
    this.FournisseurService.createFournisseur(addForm.value).subscribe(
      (response: Fournisseur) => {
        console.log(response);
        const exit = document.getElementById('exit');
        exit?.click();
        this.getAllFournisseurs();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onEdit(Fournisseur: Fournisseur): void {
    this.FournisseurService.updateFournisseur(Fournisseur).subscribe(
      (response: Fournisseur) => {
        console.log(response);
        this.getAllFournisseurs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  ////
  public set Token(fournisseur: Fournisseur) {
    this._token = fournisseur;
  }
  /// detail menu
  public menuDetail(): void {
    const icon = document.getElementById('icon_chevron');

    if (icon?.className === 'mdi mdi-chevron-right') {
      icon.className = 'mdi mdi-chevron-down';
    } else {
      icon!.className = 'mdi mdi-chevron-right';
    }
  }
  public onDelete(Id: number): void {
    this.FournisseurService.deleteFournisseur(Id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllFournisseurs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(object: any, mode: string): void {
    const conatainer = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#add');
    }
    if (mode === 'edit') {
      this.editFournisseur = object;
      button.setAttribute('data-target', '#edit');
    }
    if (mode === 'delete') {
      this.deleteFournisseur = object;
      button.setAttribute('data-target', '#delete');
    }
    if (mode === 'fournisseurDetails') {
      this.fournisseurr = object;
      button.setAttribute('data-target', '#fournisseurDetails');
    }
    if (mode === 'deleteContrat') {
      this.deleteContrat = object;
      button.setAttribute('data-target', '#deleteContrat');
    }
    conatainer?.appendChild(button);
    button.click();
  }
}

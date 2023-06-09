import { RoleService } from './../Services/role.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Utilisateur } from '../Entities/utilisateur';
import { UtilisateurService } from '../Services/utilisateur.service';
import { Role } from '../Entities/role';
@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css'],
})
export class UtilisateurComponent implements OnInit {
  public utilisateurs: Utilisateur[];
  public editUtilisateur: Utilisateur | null;
  public deleteUtilisateur: Utilisateur | null;
  public roles: Role[];
  addForm: FormGroup;

  public utilisateur: Utilisateur;
  filtredUser: any[];
  filterText: String = '';
  constructor(
    private RoleService: RoleService,
    private UtilisateurService: UtilisateurService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllRoles();
    this.getAllUsers();

    this.addForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      statutCompte: [''],
      role: [null, [Validators.required]],

      motPasse: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.minLength(4), Validators.email],
      ],
    });
  }
  //set filter text
  setFilterText(value: String) {
    this.filterText = value;
    this.filtredUser = this.filter(value);
  }
  ///filter
  filter(Nom: String) {
    if (this.utilisateurs.length === 0 || this.filterText === '') {
      return this.utilisateurs;
    } else {
      return this.utilisateurs.filter((utilisateur) => {
        return utilisateur.nom.toLowerCase().match(Nom.toLowerCase());
      });
    }
  }
  setUtilisateur(value: any) {
    this.utilisateur = value;
  }
  public getAllUsers(): void {
    this.UtilisateurService.getAllUsers().subscribe(
      (response: Utilisateur[]) => {
        this.utilisateurs = response;
        this.filtredUser = this.utilisateurs;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAllRoles(): void {
    this.RoleService.getAllRole().subscribe(
      (response: Role[]) => {
        this.roles = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // add user to the database function
  public onAdd(addForm: FormGroup): void {
    this.UtilisateurService.createUser(addForm.value).subscribe(
      (response: Utilisateur) => {
        const exit = document.getElementById('exit');
        exit?.click();
        this.getAllUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  // Edit user
  public onEdit(utilisateur: any): void {
    this.UtilisateurService.updateUsers(utilisateur).subscribe(
      (response: Utilisateur) => {
        this.getAllUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDelete(Id: number): void {
    this.UtilisateurService.deleteUser(Id).subscribe(
      (response: void) => {
        this.getAllUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //Modal
  public onOpenModal(utilisateur: Utilisateur | null, mode: string): void {
    const conatainer = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#add');
    }
    if (mode === 'edit') {
      this.editUtilisateur = utilisateur;
      button.setAttribute('data-target', '#edit');
    }
    if (mode === 'editStatut') {
      this.editUtilisateur = utilisateur;
      button.setAttribute('data-target', '#editStatut');
    }
    if (mode === 'delete') {
      this.deleteUtilisateur = utilisateur;
      button.setAttribute('data-target', '#delete');
    }
    conatainer?.appendChild(button);
    button.click();
  }
}

import { Contrat } from './../contrat/contrat';
import { ContratService } from './../Services/contrat.service';
import { RetardService } from './../Services/retard.service';
import { TypeRetardService } from './../Services/type-retard.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Vol } from '../Entities/vol';
import { TypeRetard } from '../Entities/type-retard';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Retard } from '../Entities/retard';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-add-retard',
  templateUrl: './add-retard.component.html',
  styleUrls: ['./add-retard.component.css'],
})
export class AddRetardComponent implements OnInit {
  public vol: Vol = JSON.parse(sessionStorage.getItem('vol') || '{}');
  public typeRetard: TypeRetard[];
  addForm: FormGroup;
  contrats: any[];
  contratt: any;
  filtredContrats: any[];
  filterText: String = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private TypeRetardService: TypeRetardService,
    private RetardService: RetardService,
    private ContratService: ContratService
  ) {}
  ngOnInit() {
    this.getAllTypeRetard();
    this.getAllContrats();
    this.filtredContrats = this.contrats;
    this.addForm = this.fb.group({
      typeRetard: [null, Validators.required],
      dateDeclanchement: [formatDate(new Date(), 'dd-MM-yyyy HH:mm:ss', 'en')],
      contrat: [null],
      vol: [this.vol],
    });
    this.addForm.valueChanges.subscribe;
  }
  // GET Type retard
  public getAllTypeRetard(): void {
    this.TypeRetardService.getAllTypeRetards().subscribe(
      (response: TypeRetard[]) => {
        this.typeRetard = response;
        console.log(this.typeRetard);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //set contrat
  setContrat(value: any) {
    this.contratt = value;
  }
  //delete contrat
  deleteContrtat() {
    this.contratt = null;
  }
  //set filter text
  setFilterText(value: String) {
    this.filterText = value;
    this.filtredContrats = this.filterContratByFournisseur(value);
  }

  ///filter contrtas by fournisseurs nom
  filterContratByFournisseur(fourrnisseurNom: String) {
    if (this.contrats.length === 0 || this.filterText === '') {
      return this.contrats;
    } else {
      return this.contrats.filter((contrat) => {
        return contrat.fournisseurNom
          .toLowerCase()
          .match(fourrnisseurNom.toLowerCase());
      });
    }
  }
  //get contrat
  get Contrat() {
    return this.contratt;
  }
  // add retard
  public onAdd(addForm: FormGroup): void {
    let contrat = this.addForm.controls['contrat'];

    contrat?.patchValue(this.contratt);

    console.log('contrat:---', addForm.value, 'value');
    this.RetardService.createRetard(addForm.value).subscribe(
      (response: Retard) => {
        console.log(response);
        addForm.reset();
        this.router.navigate(['/affichageVol']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);

        console.log(this.addForm.value);
        //addForm.reset();
      }
    );
  }
  // GET CONTRATS
  public getAllContrats(): void {
    this.ContratService.getAllContrats().subscribe(
      (response: Contrat[]) => {
        this.contrats = response;
        this.filtredContrats = this.contrats;
        console.log(this.contrats);
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
    if (mode === 'listContrats') {
      button.setAttribute('data-target', '#listContrats');
    }

    conatainer?.appendChild(button);
    button.click();
  }
}

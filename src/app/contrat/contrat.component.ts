import { Article } from './../Entities/article';
import { MenuDetail } from './../Entities/menuDetail';
import { Fournisseur } from './../fournisseur/fournisseur';
import { ContratService } from '../Services/contrat.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Contrat } from './contrat';
import { Menu } from '../Entities/menu';
import { MenuService } from '../Services/menu.service';
import { FournisseurService } from '../Services/fournisseur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../Services/article.service';
@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css'],
})
export class ContratComponent implements OnInit {
  public contrats: Contrat[];
  public Menus: Menu[];
  public Articles: Article[];
  public Fournisseurs: Fournisseur[];
  public Contrat: Contrat;
  public editContrat: Contrat | null;
  public deleteContrat: Contrat | null;
  public listArticle: any[];
  public f: any;

  addForm: FormGroup;
  //CONSTRUCTOR
  constructor(
    private MenuService: MenuService,
    private FournisseurService: FournisseurService,
    private route: ActivatedRoute,
    private router: Router,
    private ContratService: ContratService,
    private ArticleService: ArticleService,
    private fb: FormBuilder
  ) {
    this.listArticle = [];
  }
  // NgOnInit
  ngOnInit() {
    this.getAllContrats();
    this.getAllArticles();
    this.getAllFournisseurs();
    this.f = this.route.snapshot.params;

    this.addForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      menu: this.fb.group({
        titre: ['', Validators.required],
        details: this.fb.array([]),
      }),

      fournisseur: [null, Validators.required],
    });
    this.addForm.valueChanges.subscribe;
  }
  // GET CONTRATS
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
  // GET DETAILS CONTROLS
  get details() {
    return this.addForm.get('menu.details') as FormArray;
  }
  //Menu Form
  MenuForm() {
    return this.fb.group({
      article: [''],
      prix: [''],
    });
  }
  //add menu details
  addMenuDetail(Article: Article) {
    let formMenu = this.fb.group({
      menu: [],
      article: [Article],
      prix: [''],
    });
    this.details.push(formMenu);
  }
  //remove menu details
  deleteMenuDetail(ArticleIndex: number) {
    this.details.removeAt(ArticleIndex);
    this.deleteFromList(ArticleIndex);
  }
  // GET FOURNISSEURS
  public getAllFournisseurs(): void {
    this.FournisseurService.getAllFournisseurs().subscribe(
      (response: Fournisseur[]) => {
        this.Fournisseurs = response;
        console.log(this.Fournisseurs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //GET ARTICLES
  public getAllArticles(): void {
    this.ArticleService.getAllArticles().subscribe(
      (response: Article[]) => {
        this.Articles = response;
        console.log(this.Articles);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllMenu(): void {
    this.MenuService.getAllMenu().subscribe(
      (response: Menu[]) => {
        this.Menus = response;
        console.log(this.Menus);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // add Article to list
  public addToList(Article: Article): void {
    this.listArticle.push(Article);
  }
  //delete article from list
  public deleteFromList(i: number): void {
    this.listArticle.splice(i, 1);
    console.log(i);
    console.log(this.listArticle);
  }

  public onAdd(addForm: FormGroup): void {
    console.log('*********');
    console.log(this.addForm.value);
    console.log('*********');

    this.ContratService.createContrat(addForm.value).subscribe(
      (response: Contrat) => {
        console.log(response);

        this.getAllContrats();
        this.listArticle = [];
        addForm.reset();
        sessionStorage.setItem('contrat', JSON.stringify(response));
        this.router.navigate(['/menuDetail']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);

        console.log(this.addForm.value);
        //addForm.reset();
      }
    );
  }

  public onEdit(Contrat: Contrat): void {
    this.ContratService.updateContrat(Contrat).subscribe(
      (response: Contrat) => {
        console.log(response);
        this.getAllContrats();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

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

    if (mode === 'menuDetails') {
      this.Contrat = Contrat;
      button.setAttribute('data-target', '#menuDetails');
    }
    conatainer?.appendChild(button);
    button.click();
  }
}

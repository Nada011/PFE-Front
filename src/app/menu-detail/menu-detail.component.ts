import { MenuDetail } from './../Entities/menuDetail';
import { MenuDetailService } from './../Services/menu-detail.service';
import { Menu } from './../Entities/menu';
import { Component, OnInit } from '@angular/core';
import { Contrat } from '../contrat/contrat';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Article } from '../Entities/article';
import { Fournisseur } from '../fournisseur/fournisseur';
import { ArticleService } from '../Services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css'],
})
export class MenuDetailComponent implements OnInit {
  public Articles: Article[];
  public Fournisseurs: Fournisseur[];

  // public deleteContrat: Contrat | null;
  public listArticle: any[];
  //public f: any;
  public article: Article;
  addForm: FormGroup;
  Contrat: any = JSON.parse(sessionStorage.getItem('contrat') || '{}');

  //CONSTRUCTOR
  constructor(
    //private MenuService: MenuService,
    private MenuDetailService: MenuDetailService,
    //private route: ActivatedRoute,
    private router: Router,
    // private ContratService: ContratService,
    private ArticleService: ArticleService,
    private fb: FormBuilder
  ) {
    this.listArticle = [];
  }

  // NgOnInit
  ngOnInit() {
    this.getAllArticles();
    this.getAllFournisseurs();
    //this.f = this.route.snapshot.params;
    console.log(this.Contrat);
    this.addForm = this.fb.group({
      details: this.fb.array([]),
    });
    this.addForm.valueChanges.subscribe;
  }

  // GET DETAILS CONTROLS
  get details() {
    return this.addForm.get('details') as FormArray;
  }

  //add menu details
  addMenuDetail(Article: Article) {
    let formMenu = this.fb.group({
      menu: [this.Contrat.menu],
      article: [Article],
      prix: [''],
    });
    this.details.push(formMenu);
    this.addToList(Article);
    console.log(formMenu.value);
  }
  //remove menu details
  deleteMenuDetail(ArticleIndex: number) {
    this.details.removeAt(ArticleIndex);
    this.deleteFromList(ArticleIndex);
  }
  // GET FOURNISSEURS
  public getAllFournisseurs(): void {
    //this.FournisseurService.getAllFournisseurs().subscribe(
    //(response: Fournisseur[]) => {
    //  this.Fournisseurs = response;
    //console.log(this.Fournisseurs);
    // },
    (error: HttpErrorResponse) => {
      alert(error.message);
    };
    //);
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

  // add Article to list
  public addToList(Article: Article): void {
    this.listArticle.push(Article);
  }
  // delete from list
  public deleteFromList(i: number): void {
    this.listArticle.splice(i, 1);
  }
  public onAdd(addForm: FormGroup): void {
    console.log('*********');
    console.log(this.addForm.controls['details'].value);
    console.log(this.details.value);
    console.log('*********');
    let formValue = this.addForm.controls['details'].value;
    this.MenuDetailService.createDetailMenu(formValue).subscribe(
      (response: MenuDetail[]) => {
        console.log(response);
        this.listArticle = [];
        addForm.reset();
        this.router.navigate(['/ContratDashboard']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);

        console.log(this.addForm.value);
        addForm.reset();
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
      //  this.editContrat = Contrat;
      button.setAttribute('data-target', '#edit');
    }
    if (mode === 'delete') {
      //this.deleteContrat = Contrat;
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

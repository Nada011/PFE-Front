import { MenuDetail } from './../Entities/menuDetail';
import { Menu } from './../Entities/menu';
import { Component, OnInit } from '@angular/core';
import { MenuDetailService } from '../Services/menu-detail.service';
import { ContratService } from '../Services/contrat.service';
import { MenuService } from '../Services/menu.service';
import { Router } from '@angular/router';
import { Contrat } from '../contrat/contrat';
import { FournisseurService } from '../Services/fournisseur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Fournisseur } from '../fournisseur/fournisseur';
import { Article } from '../Entities/article';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ArticleService } from '../Services/article.service';
@Component({
  selector: 'app-update-contrat',
  templateUrl: './update-contrat.component.html',
  styleUrls: ['./update-contrat.component.css'],
})
export class UpdateContratComponent implements OnInit {
  public Menu: any = JSON.parse(sessionStorage.getItem('Menu') || '{}');
  public Articles: Article[];
  public listArticle: any[];
  MenuDetails: any[];
  addForm: FormGroup;
  editdetailMenu: any;
  deletedetail: any;

  //CONSTRUCTOR
  constructor(
    private MenuService: MenuService,
    private MenuDetailService: MenuDetailService,
    private FournisseurService: FournisseurService,
    //private route: ActivatedRoute,
    private fb: FormBuilder,
    private ArticleService: ArticleService,

    private router: Router,
    private ContratService: ContratService //private fb: FormBuilder
  ) {
    this.listArticle = [];
  }
  // NgOnInit
  ngOnInit() {
    this.getAllArticles();
    this.getDetailMenu();
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
      menu: [this.Menu],
      article: [Article],
      prix: [''],
    });
    this.details.push(formMenu);
    this.addToList(Article);
    console.log('menuuuu', this.Menu);
    console.log(formMenu.value);
  }

  //remove menu details
  deleteMenuDetail(ArticleIndex: number) {
    this.details.removeAt(ArticleIndex);
    this.deleteFromList(ArticleIndex);
  }
  //Edit
  public onEdit(detail: MenuDetail): void {
    this.MenuDetailService.updateDetailMenu(detail).subscribe(
      (response: MenuDetail) => {
        console.log(response);
        this.getDetailMenu();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(detail);
      }
    );
  }
  //DELETE
  public onDelete(Id: number): void {
    this.MenuDetailService.deleteDetailMenu(Id).subscribe(
      (response: void) => {
        console.log(response);
        this.getDetailMenu();
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
  // GET Menu details
  public getDetailMenu(): void {
    this.MenuDetailService.getDetailMenu(this.Menu.id).subscribe(
      (response: MenuDetail[]) => {
        this.MenuDetails = response;
        console.log(this.MenuDetails);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(this.Menu.id);
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
        this.getDetailMenu();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);

        console.log(this.addForm.value);
        addForm.reset();
      }
    );
  }
  public onOpenModal(detail: any, mode: string): void {
    const conatainer = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'MenuList') {
      button.setAttribute('data-target', '#MenuList');
    }
    if (mode === 'edit') {
      this.editdetailMenu = detail;
      button.setAttribute('data-target', '#edit');
    }
    if (mode === 'delete') {
      this.deletedetail = detail;
      button.setAttribute('data-target', '#delete');
    }
    if (mode === 'ArticleList') {
      button.setAttribute('data-target', '#ArticleList');
    }

    conatainer?.appendChild(button);
    button.click();
  }
}

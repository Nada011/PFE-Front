import { MenuService } from '../Services/menu.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from '../Entities/menu';
import { HttpErrorResponse } from '@angular/common/http';
import { Article } from '../Entities/article';
import { ArticleService } from '../Services/article.service';
import { empty, findIndex } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  public Menu: Menu[];
  public editMenu: any;
  public deleteMenu: any;
  public articles: Article[];
  public Lemenu: any;
  listArticle: Article[];
  addForm: FormGroup;
  constructor(
    private ArticleService: ArticleService,
    private MenuService: MenuService,
    private fb: FormBuilder
  ) {
    this.listArticle = [];
  }

  ngOnInit() {
    this.getAllMenu();
    this.getAllArticles();
    this.addForm = this.fb.group({
      titre: ['', Validators.required],
      articles: [this.listArticle],
    });
  }
  public getAllArticles(): void {
    this.ArticleService.getAllArticles().subscribe(
      (response: Article[]) => {
        this.articles = response;
        console.log(this.articles);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // add article to list
  public addToList(Article: Article): void {
    this.listArticle.push(Article);
  }
  public deleteFromList(i: number): void {
    this.listArticle.splice(i, 1);
    console.log(i);
    console.log(this.listArticle);
  }

  public getAllMenu(): void {
    this.MenuService.getAllMenu().subscribe(
      (response: Menu[]) => {
        this.Menu = response;
        console.log(this.Menu);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAdd(addForm: FormGroup): void {
    this.MenuService.createMenu(addForm.value).subscribe(
      (response: Menu) => {
        console.log(response);
        this.getAllMenu();
        this.listArticle = [];
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onEdit(Menu: Menu): void {
    this.MenuService.updateMenu(Menu).subscribe(
      (response: Menu) => {
        console.log(response);
        this.getAllMenu();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDelete(Id: number): void {
    this.MenuService.deleteMenu(Id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllMenu();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(menu: any, mode: string): void {
    const conatainer = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'ArticleList') {
      button.setAttribute('data-target', '#ArticleList');
    }
    if (mode === 'edit') {
      this.editMenu = menu;
      button.setAttribute('data-target', '#edit');
    }
    if (mode === 'delete') {
      this.deleteMenu = menu;
      button.setAttribute('data-target', '#delete');
    }
    if (mode === 'menuDetails') {
      this.Lemenu = menu;
      button.setAttribute('data-target', '#menuDetails');
    }

    conatainer?.appendChild(button);
    button.click();
  }
}

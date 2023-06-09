import { Article } from './../Entities/article';
import { ArticleService } from '../Services/article.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  public articles: Article[];
  public editArticle: Article | null;
  public deleteArticle: Article | null;
  addForm: FormGroup;
  public article: any;
  FiltredArticles: any[];
  filterText: String = '';
  constructor(
    private ArticleService: ArticleService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllArticles();
    this.addForm = this.fb.group({
      nomArticleFr: ['', Validators.required],
      nomArticleEn: ['', Validators.required],
      nomArticleAr: ['', Validators.required],
      description: [''],
    });
    this.addForm.valueChanges.subscribe;
  }
  //set filter text
  setFilterText(value: String) {
    this.filterText = value;
    this.FiltredArticles = this.filter(value);
  }
  ///filter
  filter(Nom: String) {
    if (this.articles.length === 0 || this.filterText === '') {
      return this.articles;
    } else {
      return this.articles.filter((article) => {
        return article.nomArticleFr.toLowerCase().match(Nom.toLowerCase());
      });
    }
  }
  setArticle(value: any) {
    this.article = value;
  }
  public getAllArticles(): void {
    this.ArticleService.getAllArticles().subscribe(
      (response: Article[]) => {
        this.articles = response;

        this.FiltredArticles = this.articles;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAdd(addForm: FormGroup): void {
    this.ArticleService.createArticle(addForm.value).subscribe(
      (_response: Article) => {
        const exit = document.getElementById('exit');
        exit?.click();
        this.getAllArticles();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onEdit(article: Article): void {
    this.ArticleService.updateArticle(article).subscribe(
      (response: Article) => {
        this.getAllArticles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDelete(Id: number): void {
    this.ArticleService.deleteArticle(Id).subscribe(
      (response: void) => {
        this.getAllArticles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(article: any, mode: string): void {
    const conatainer = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#add');
    }
    if (mode === 'edit') {
      this.editArticle = article;
      button.setAttribute('data-target', '#edit');
    }
    if (mode === 'delete') {
      this.deleteArticle = article;
      button.setAttribute('data-target', '#delete');
    }
    conatainer?.appendChild(button);
    button.click();
  }
}

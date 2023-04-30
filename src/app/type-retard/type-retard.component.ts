import { TypeRetardService } from '../Services/type-retard.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeRetard } from '../Entities/type-retard';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-type-retard',
  templateUrl: './type-retard.component.html',
  styleUrls: ['./type-retard.component.css'],
})
export class TypeRetardComponent implements OnInit {
  public TypeRetards: TypeRetard[];
  public editTypeRetard: TypeRetard | null;
  public deleteTypeRetard: TypeRetard | null;

  addForm: FormGroup;
  constructor(
    private TypeRetardService: TypeRetardService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllTypeRetards();
    this.addForm = this.fb.group({
      type: ['', Validators.required],
    });
  }

  //get all typeRetard
  public getAllTypeRetards(): void {
    this.TypeRetardService.getAllTypeRetards().subscribe(
      (response: TypeRetard[]) => {
        this.TypeRetards = response;
        console.log(this.TypeRetards);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // add typeRetard
  public onAdd(addForm: FormGroup): void {
    this.TypeRetardService.createTypeRetard(addForm.value).subscribe(
      (response: TypeRetard) => {
        console.log(response);
        this.getAllTypeRetards();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  //Edit typeRetard
  public onEdit(TypeRetard: any): void {
    this.TypeRetardService.updateTypeRetard(TypeRetard).subscribe(
      (response: TypeRetard) => {
        console.log(response);
        this.getAllTypeRetards();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // delete TypeRetard
  public onDelete(Id: number): void {
    this.TypeRetardService.deleteTypeRetard(Id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllTypeRetards();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(TypeRetard: any, mode: string): void {
    const conatainer = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#add');
    }
    if (mode === 'edit') {
      this.editTypeRetard = TypeRetard;
      button.setAttribute('data-target', '#edit');
    }
    if (mode === 'delete') {
      this.deleteTypeRetard = TypeRetard;
      button.setAttribute('data-target', '#delete');
    }
    conatainer?.appendChild(button);
    button.click();
  }
}

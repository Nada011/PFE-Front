import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TypeRetard } from '../Entities/type-retard';
import { RoleService } from '../Services/role.service';
import { Role } from '../Entities/role';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  addForm: FormGroup;
  public Roles: Role[];
  public deleteRole: any;
  constructor(private RoleService: RoleService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAllRole();
    this.addForm = this.fb.group({
      roleName: ['', Validators.required],
      roleDescription: [''],
    });
  }

  //get all typeRetard
  public getAllRole(): void {
    this.RoleService.getAllRole().subscribe(
      (response: Role[]) => {
        this.Roles = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // add typeRetard
  public onAdd(addForm: FormGroup): void {
    this.RoleService.createRole(addForm.value).subscribe(
      (response: Role) => {
        console.log(response);
        this.getAllRole();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  //Edit typeRetard
  public onEdit(Role: any): void {
    this.RoleService.updateRole(Role).subscribe(
      (response: Role) => {
        console.log(response);
        this.getAllRole();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // delete TypeRetard
  public onDelete(role: String): void {
    this.RoleService.deleteRole(role).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllRole();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(role: any, mode: string): void {
    const conatainer = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#add');
    }

    if (mode === 'delete') {
      this.deleteRole = role;
      button.setAttribute('data-target', '#delete');
    }
    conatainer?.appendChild(button);
    button.click();
  }
}

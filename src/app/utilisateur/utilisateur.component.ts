import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Utilisateur } from './utilisateur';
import { UtilisateurService} from './utilisateur.service';
@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  public utilisateurs: Utilisateur[];
  public editUtilisateur: Utilisateur | null;
  public deleteUtilisateur: Utilisateur  | null;
  addForm:FormGroup;
  constructor(private UtilisateurService: UtilisateurService ,private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllUsers();
    this.addForm=this.fb.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      statutCompte:[''],
      role:['',[
        Validators.required,

      ]],

      motPasse:['',[
        Validators.required,

      ]],
      email:['',[
        Validators.required,
        Validators.minLength(4),
        Validators.email
      ]],
    })

  }
  public getAllUsers():void{
    this.UtilisateurService.getAllUsers().subscribe(
      (response: Utilisateur[])=>{
        this.utilisateurs = response;
        console.log(this.utilisateurs);
      },
      (error: HttpErrorResponse) =>{
        alert (error.message);
      }
      );}

// add user to the database function
      public onAdd(addForm:FormGroup): void{
        this.UtilisateurService.createUser(addForm.value).subscribe(
          (response: Utilisateur)=>{
            console.log(response);
            this.getAllUsers();
            addForm.reset();

          },
          (error: HttpErrorResponse)=>{
            alert(error.message);
            addForm.reset();
          }
          )

       }
//Edit status account
public editStatusCompte(Utilisateur:any){
 const radio1=document.getElementById('radio1')as HTMLInputElement;
 const radio2=document.getElementById('radio2')as HTMLInputElement;
if (radio1.checked===true)
  {Utilisateur.statutCompte=true;}
if (radio2.checked===true)
  {Utilisateur.statutCompte=false;}
 this.UtilisateurService.updateUsers(Utilisateur).subscribe (
  (response:Utilisateur)=>{
    console.log(Utilisateur);
    this.getAllUsers();

  },
 (error: HttpErrorResponse)=>{
  alert(error.message);
 }
 );

}
// Edit user
      public onEdit(utilisateur:any): void{
       this.UtilisateurService.updateUsers(utilisateur).subscribe(
        (response:Utilisateur)=>{
          console.log(utilisateur);
          this.getAllUsers();

        },
       (error: HttpErrorResponse)=>{
        alert(error.message);
       }
       );
      }
      public onDelete(Id: number): void {
        this.UtilisateurService.deleteUser(Id).subscribe(
          (response: void) => {
            console.log(response);
            this.getAllUsers();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }

public Status(statut:boolean){
  const statutLabel=document.getElementById('statut');
 // let msg='null';
  if(statut===true){
    statutLabel?.setAttribute('class','badge badge-success');
    //  msg ="Activé";
  }
  if(statut===false){
    statutLabel?.setAttribute('class','badge btn-danger');
      //msg ="Désactivé";

  }
//statutLabel?.innerText!=msg;
}


    //Modal
    public onchecked( mode: boolean): void
    {

     const radio1=document.getElementById('radio1')as HTMLInputElement;
     const radio2=document.getElementById('radio2')as HTMLInputElement;


     if(mode === true){
      radio1.checked;
     }
     if(mode === false){
      radio2.checked;
     }


    }
      //Modal
      public onOpenModal(utilisateur:Utilisateur  | null, mode: string): void
      {

       const conatainer=document.getElementById('container')
       const button = document.createElement('button');
       button.type='button';
       button.style.display='none';
       button.setAttribute('data-toggle', 'modal');
       if(mode === 'add'){
        button.setAttribute('data-target','#add');
       }
       if(mode === 'edit'){
        this.editUtilisateur=utilisateur ;
        button.setAttribute('data-target','#edit');
       }
       if(mode === 'editStatut'){
        this.editUtilisateur=utilisateur ;
        button.setAttribute('data-target','#editStatut');
       }
       if(mode === 'delete'){
        this.deleteUtilisateur=utilisateur;
        button.setAttribute('data-target','#delete');
       }
       conatainer?.appendChild(button);
       button.click();
      }
}

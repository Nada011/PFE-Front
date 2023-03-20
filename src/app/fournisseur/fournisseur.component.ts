import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Fournisseur } from './fournisseur';
import { FournisseurService } from './fournisseur.service';
@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
public fournisseurs: Fournisseur[];
public editFournisseur: Fournisseur | null;
public deleteFournisseur: Fournisseur | null;



addForm:FormGroup;
constructor(private FournisseurService: FournisseurService ,private fb:FormBuilder) { }


  ngOnInit() {
    this.getAllFournisseurs();
    this.addForm=this.fb.group({
      nom:['',Validators.required],
      numTel:[null,[
        Validators.required,

      ]],
      fax:[null],
      adresse:['',[
        Validators.required,

      ]],
      codePostal:['',[
        Validators.required,

      ]],

      ville:['',[
        Validators.required,

      ]],
      email:['',[
        Validators.required,
        Validators.minLength(4),
        Validators.email
      ]],
    })


  }
      //getters
      get nom(){
        return this.addForm.get('nom')
      }
      get numTel(){
        return this.addForm.get('numTel')
      }
      get fax(){
        return this.addForm.get('fax')
      }
      get adresse(){
        return this.addForm.get('adresse')
      }
      get codePostal(){
        return this.addForm.get('codePostal')
      }
      get ville(){
        return this.addForm.get('ville')
      }
      get email(){
        return this.addForm.get('email')
      }
  public getAllFournisseurs():void{
    this.FournisseurService.getAllFournisseurs().subscribe(
      (response: Fournisseur[])=>{
        this.fournisseurs = response;
        console.log(this.fournisseurs);
      },
      (error: HttpErrorResponse) =>{
        alert (error.message);
      }
      );}
           public onAdd(addForm:FormGroup): void{
        this.FournisseurService.createFournisseur(addForm.value).subscribe(
          (response: Fournisseur)=>{
            console.log(response);
            this.getAllFournisseurs();
            addForm.reset();

          },
          (error: HttpErrorResponse)=>{
            alert(error.message);
            addForm.reset();
          }
          )

       }




      public onEdit(Fournisseur:Fournisseur): void{
        this.FournisseurService.updateFournisseur(Fournisseur).subscribe(
         (response:Fournisseur)=>{
           console.log(response);
           this.getAllFournisseurs();

         },
        (error: HttpErrorResponse)=>{
         alert(error.message);
        }
        );
       }

       public onDelete(Id: number): void {
        this.FournisseurService.deleteFournisseur(Id).subscribe(
          (response: void) => {
            console.log(response);
            this.getAllFournisseurs();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      public onOpenModal(Fournisseur:Fournisseur  | null, mode: string): void
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
        this.editFournisseur=Fournisseur ;
        button.setAttribute('data-target','#edit');
       }
       if(mode === 'delete'){
        this.deleteFournisseur=Fournisseur;
        button.setAttribute('data-target','#delete');
       }
       conatainer?.appendChild(button);
       button.click();
      }
}



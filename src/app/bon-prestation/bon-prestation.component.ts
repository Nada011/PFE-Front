import { RetardService } from './../Services/retard.service';
import { Component, OnInit } from '@angular/core';
import jsPDF, { jsPDFAPI } from 'jspdf';
import { Retard } from '../Entities/retard';
import { HttpErrorResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-bon-prestation',
  templateUrl: './bon-prestation.component.html',
  styleUrls: ['./bon-prestation.component.css'],
})
export class BonPrestationComponent implements OnInit {
  test: boolean = false;
  printContent: any;
  originalContent: any;
  retard: any = JSON.parse(sessionStorage.getItem('retard') || '{}');
  bon: any = JSON.parse(sessionStorage.getItem('bon') || '{}');
  constructor(private RetardService: RetardService, private router: Router) {}
  ngOnInit(): void {
    this.onEdit();
    this.printTest();
    // this.printContent = document.getElementById('printableArea')?.innerHTML;
    // this.originalContent = document.body.innerHTML;
  }

  public Print(divName: string): void {
    const printContent = document.getElementById(divName)?.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent!;
    window.print();
    document.body.innerHTML = originalContent!;
  }
  public printTest() {
    let buttonClicked = false;
    let printContent = this.printContent;
    const button = document.getElementById('add-Floating-button');
    button?.addEventListener('click', function handleClick() {
      window.print();
      buttonClicked = true;
      if (buttonClicked) {
        button.setAttribute('routerLink', '/dashboardRetard');
      }

      console.log(buttonClicked);
    });
    this.test = buttonClicked;
    console.log(this.test);
    if (buttonClicked) this.router.navigate(['/dashboardRetard']);
  }
  public onEdit(): void {
    this.RetardService.updateValidite(this.bon).subscribe(
      (response: any) => {},
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}

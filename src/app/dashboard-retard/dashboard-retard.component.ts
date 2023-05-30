import { Retard } from './../Entities/retard';
import { Component, OnInit } from '@angular/core';
import { Vol } from '../Entities/vol';
import { RetardService } from '../Services/retard.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-retard',
  templateUrl: './dashboard-retard.component.html',
  styleUrls: ['./dashboard-retard.component.css'],
})
export class DashboardRetardComponent implements OnInit {
  public Retards: any[];
  public Retard: any;
  constructor(private RetardService: RetardService, private router: Router) {}
  ngOnInit() {
    this.getAllRetards();
  }

  // GET Retard
  public getAllRetards(): void {
    this.RetardService.getAllRetards().subscribe(
      (response: Retard[]) => {
        this.Retards = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(Retard: any, mode: string): void {
    const conatainer = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'bon') {
      this.Retard = Retard;
      button.setAttribute('data-target', '#bon');
    }

    conatainer?.appendChild(button);
    button.click();
  }
}

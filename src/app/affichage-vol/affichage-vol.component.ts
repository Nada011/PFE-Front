import { VolService } from './../Services/vol.service';
import { Component, OnInit } from '@angular/core';
import { Vol } from '../Entities/vol';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affichage-vol',
  templateUrl: './affichage-vol.component.html',
  styleUrls: ['./affichage-vol.component.css'],
})
export class AffichageVolComponent implements OnInit {
  public vols: Vol[];
  constructor(private VolService: VolService, private router: Router) {}
  ngOnInit() {
    this.getAllVols();
  }
  // redirect to page contrat to add retard
  redirectTo(page: String, object: any) {
    if (page == 'addRetard') {
      sessionStorage.setItem('vol', JSON.stringify(object));

      this.router.navigate(['/addRetard'], {});
    }
  }
  // GET Vols
  public getAllVols(): void {
    this.VolService.getAllVols().subscribe(
      (response: Vol[]) => {
        this.vols = response;
        console.log(this.vols);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}

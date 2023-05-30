import { Utilisateur } from 'src/app/Entities/utilisateur';
import { AuthService } from '../Auth/AuthService/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  public user: Utilisateur;
  constructor(private AuthService: AuthService) {}
  ngOnInit(): void {
    console.log(this.AuthService.getToken());
    this.user = this.AuthService.getUser();
  }
}

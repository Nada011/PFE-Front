import { Router } from '@angular/router';
import { AuthService } from './../Auth/AuthService/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private AuthService: AuthService, private Router: Router) {}
  ngOnInit(): void {}
  public Logout() {
    this.AuthService.clear();
    this.Router.navigate(['/login']);
  }
}

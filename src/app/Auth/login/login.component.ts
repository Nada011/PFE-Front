import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../AuthService/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Auth: FormGroup;
  constructor(
    private routrer: Router,
    private fb: FormBuilder,
    private AuthService: AuthService
  ) {}
  ngOnInit(): void {
    this.Auth = this.fb.group({
      email: ['', [Validators.required]],
      motPasse: ['', Validators.required],
    });
  }
  // add typeRetard
  public Authenticate(Auth: FormGroup): void {
    this.AuthService.Authenticate(Auth.value).subscribe(
      (response: any) => {
        console.log(response);
        this.AuthService.setRoles(response.user.role.roleName);
        this.AuthService.setToken(response.jwtToken);
        this.AuthService.setUser(response.user);
        const role = response.user.role.roleName;
        if (role === 'Admin') {
          this.routrer.navigate(['AdminDashboard/utilisateurs']);
        }
        if (role.match('Chef d’escale')) {
          this.routrer.navigate(['/affichageVol']);
        }
        if (role.match('Agent de comptoir')) {
          this.routrer.navigate(['/dashboardRetard']);
        }
        Auth.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);

        Auth.reset();
      }
    );
  }
}

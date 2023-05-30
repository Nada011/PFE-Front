import { AuthService } from './../Auth/AuthService/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  constructor(private AuthService: AuthService) {}
  ngOnInit() {}
  public isAllowed(role: string) {
    const match = this.AuthService.roleMatch(role);
    if (match) {
      return true;
    } else {
      return false;
    }
  }
}

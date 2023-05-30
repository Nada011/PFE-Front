import { AuthService } from './Auth/AuthService/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  role: any;
  constructor(private AuthService: AuthService) {}

  ngOnInit() {}
}

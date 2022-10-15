import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthenticateService) {}
  $user = this.authService.currentUser$;
  ngOnInit(): void {}
}

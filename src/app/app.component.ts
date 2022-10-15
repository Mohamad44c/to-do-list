import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from './services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public authService: AuthenticateService,
    private router: Router
  ) {}
  signout() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}

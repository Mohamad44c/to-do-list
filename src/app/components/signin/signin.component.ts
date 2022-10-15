import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    public authService: AuthenticateService,
    private router: Router,
    private formbuilder: NonNullableFormBuilder
  ) {}
  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }
  submit() {
    // destructure signin form
    const { email, password } = this.signinForm.value;
    if (!this.signinForm.valid || !email || !password) {
      return;
    }
    this.authService.signIn(email, password).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
  ngOnInit(): void {
    this.signinForm.value.email;
  }
}

import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';

// function to validate if password and confirm password match and will return true if error
export function PasswordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password != confirmPassword) {
      return { passwordsDontMatch: true };
    }
    return null;
  };
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm = this.formbuilder.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: PasswordsMatchValidator() }
  );
  constructor(
    private router: Router,
    private formbuilder: NonNullableFormBuilder,
    private authService: AuthenticateService
  ) {}

  get name() {
    return this.signupForm.get('name');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
  submit() {
    const { name, email, password } = this.signupForm.value;
    if (!this.signupForm.valid || !name || !email || !password) {
      return;
    }
    this.authService.signUp(name, email, password).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
  ngOnInit(): void {}
}

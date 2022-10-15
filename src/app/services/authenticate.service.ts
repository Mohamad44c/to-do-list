import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  currentUser$ = authState(this.auth);
  constructor(private auth: Auth) {}

  signIn(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }
  signUp(name: string, username: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth,  username, password)
    );
  } 
  signOut() {
    return from(this.auth.signOut());
  }
}

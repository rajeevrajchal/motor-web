import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthChangeEvent, AuthSession, Session } from '@supabase/supabase-js';
import { SupabaseService } from '../../../core/service/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _session: AuthSession | null = null;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router
  ) {}

  get session() {
    this.supabase.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  updateSession(session: AuthSession) {
    this._session = session;
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    this.supabase.supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }

  loginWithEmail(email: string) {
    return this.supabase.supabase.auth.signInWithOtp({
      email: email,
    });
  }

  loginWithGoogle() {
    return this.supabase.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  logout() {
    this.supabase.supabase.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('I am in');
        console.log('the error', error);
      });
  }
}

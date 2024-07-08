import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthChangeEvent,
  AuthSession,
  Session,
  SupabaseClient,
  createClient,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  constructor(private readonly router: Router) {
    this.supabase = createClient(
      environment?.supabaseUrl,
      environment?.supabaseKey
    );
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  loginWithEmail(email: string) {
    return this.supabase.auth.signInWithOtp({
      email: email,
    });
  }

  loginWithGoogle() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  logout() {
    this.supabase.auth
      .signOut()
      .then(() => {
        window.location.reload();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log('the error', error);
      });
  }
}

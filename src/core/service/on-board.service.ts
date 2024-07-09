import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OnBoardService {
  private supabase: SupabaseClient;

  constructor(private readonly router: Router) {
    this.supabase = createClient(
      environment?.supabaseUrl,
      environment?.supabaseKey
    );
  }

  async onBoardCheck() {
    let { data: vehicle } = await this.supabase.from('vehicle').select('*');
    if (vehicle?.length === 0) {
      this.router.navigate(['/vehicle/add']);
      return false;
    } else {
      return true;
    }
  }
}

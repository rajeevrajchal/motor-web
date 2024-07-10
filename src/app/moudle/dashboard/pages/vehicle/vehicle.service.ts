import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { SupabaseService } from '../../../../../core/service/supabase.service';
import { VEHICLE } from '../../../../../model/vehicle.model';
import { AuthService } from '../../../auth/auth.service';

export type VEHICLE_INPUT = {
  name: string;
  identity: string;
  fuel: string;
  owner: string;
};

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(
    private readonly auth: AuthService,
    private readonly supabase: SupabaseService
  ) {}

  getVehicle(): Observable<VEHICLE[]> {
    return from(
      this.supabase.supabase
        .from('vehicle')
        .select('*')
        .eq('owner', this.auth.session?.user?.id)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data || [];
      }),
      catchError((error) => throwError(() => error))
    );
  }
  saveVehicle(vehicle: VEHICLE_INPUT): Observable<VEHICLE[]> {
    return from(
      this.supabase.supabase
        .from('vehicle')
        .insert([{ ...vehicle }])
        .select()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data || [];
      }),
      catchError((error) => throwError(() => error))
    );
  }
}

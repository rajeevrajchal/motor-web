import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GAS } from '../../../../../model/gas.model';
import { SupabaseService } from './../../../../../core/service/supabase.service';

export type GAS_INPUT = {
  name: string;
  identity: string;
  fuel: string;
  owner: string;
};

@Injectable({
  providedIn: 'root',
})
export class GasService {
  constructor(private supabase: SupabaseService) {}

  getAllGasByVehicle(payload: {
    vehicle: string;
    date_filter_from: string;
    date_filter_to: string;
  }): Observable<GAS[]> {
    const { vehicle, date_filter_from, date_filter_to } = payload;

    return from(
      this.supabase.supabase
        .from('gas')
        .select(`*, vehicle:vehicle_id (*)`)
        .eq('vehicle_id', vehicle)
        .lte('created_at', date_filter_to)
        .gte('created_at', date_filter_from)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data || [];
      }),
      catchError((error) => throwError(() => error))
    );
  }

  getGasDetail(gas: string): Observable<GAS[]> {
    return from(
      this.supabase.supabase
        .from('gas')
        .select(`*, vehicle:vehicle_id (*)`)
        .eq('id', gas)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data || [];
      }),
      catchError((error) => throwError(() => error))
    );
  }

  saveGas(gas: GAS_INPUT): Observable<GAS[]> {
    return from(
      this.supabase.supabase
        .from('gas')
        .insert([{ ...gas }])
        .select()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data || [];
      }),
      catchError((error) => throwError(() => error))
    );
  }

  updateGas(gas: GAS_INPUT, gas_id: string): Observable<GAS[]> {
    return from(
      this.supabase.supabase
        .from('gas')
        .update([{ ...gas }])
        .eq('id', gas_id)
        .select()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data || [];
      }),
      catchError((error) => throwError(() => error))
    );
  }

  deleteRecord(gas: string): Observable<GAS[]> {
    return from(
      this.supabase.supabase.from('gas').delete().eq('id', gas).select('*')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data || [];
      }),
      catchError((error) => throwError(() => error))
    );
  }
}

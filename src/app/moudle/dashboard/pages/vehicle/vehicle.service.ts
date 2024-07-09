import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../../../core/service/supabase.service';
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

  async getVehicle() {
    const { error, data } = await this.supabase.supabase
      .from('vehicle')
      .select('*')
      .eq('owner', this.auth.session?.user?.id);
    if (error) {
      throw error;
    }
    return data;
  }

  saveVehicle(vehicle: VEHICLE_INPUT) {
    console.log('the vehicle', vehicle);
  }
}

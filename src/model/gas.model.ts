import { VEHICLE } from './vehicle.model';

export interface GAS {
  id: any;
  created_at: string;
  unit: string;
  vehicle_id: string;
  cost: string;
  quantity: string;
  delete: boolean;
  updated_at?: string;
  vehicle: VEHICLE;
}

export interface GAS {
  id: string;
  createdAt: string;
  unit: string;
  vehicleId: string;
  cost: number;
  quantity: number;
  delete: boolean;
  updatedAt?: string;
}

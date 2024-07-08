import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {
  date: Date = new Date();
  gas_inventory: any = [
    {
      createdAt: this.date,
      vehicle: 'Vehicle 1',
      cost: 300,
    },
    {
      createdAt: this.date,
      vehicle: 'Vehicle 1',
      cost: 420.2,
    },
  ];

  constructor() {}

  ngOnInit() {}

  getTotalCost() {
    return this.gas_inventory.reduce(
      (acc: any, curr: any) => acc + curr.cost,
      0
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';
@Component({
  selector: 'app-zone-view',
  templateUrl: './zone-view.component.html',
  styleUrls: ['./zone-view.component.scss']
})
export class ZoneViewComponent implements OnInit {
  zone: Inventory[];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    // debugger;
    this.inventoryService
    .getZones()
    .subscribe((data: Inventory[]) => {
      this.zone = data;
      debugger;
  });
}
}

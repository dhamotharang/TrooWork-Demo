import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { ActivatedRoute,Router } from "@angular/router";
@Component({
  selector: 'app-zone-create',
  templateUrl: './zone-create.component.html',
  styleUrls: ['./zone-create.component.scss']
})
export class ZoneCreateComponent implements OnInit {
  building: Inventory[];
  floorName: Inventory[];
  constructor(private inventoryService: InventoryService,private router: Router) { }

  addZone(FacilityKey,FloorName,ZoneName) {
    if (!FacilityKey) {
      alert("Please select a building!");
    } else if (!FloorName) {
      alert("Enter floor name!");
    }
    else if (!ZoneName) {
      alert("Enter zone name!");
    }
    else {
 
    this.inventoryService.createZones(FacilityKey,FloorName,ZoneName)
    .subscribe((data: Inventory[]) => {
      alert("Zone created successfully");
      this.router.navigateByUrl('/Zoneview');
    });
  }

}

 selectFloorfromBuildings(facKey)
 {
  this.inventoryService
    .getallFloorList(facKey)
    .subscribe((data: Inventory[]) => {
      // debugger;
      this.floorName = data;
    });
  }

  ngOnInit() 
  {
    this.inventoryService
    .getallBuildingList()
    .subscribe((data: Inventory[]) => {
      // debugger;
      this.building = data;
    });
  

  }

}

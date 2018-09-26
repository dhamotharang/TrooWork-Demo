// @Author: Rodney
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.scss']
})
export class ZoneEditComponent implements OnInit {
  facKey$: Object;
  floorKey$: Object;
  zoneKey$: Object;

  floorList: Inventory[] = [];
  buildingList: Inventory[] = [];
  zoneEditValues: Inventory[];
  zone: Inventory[];
  constructor(private route: ActivatedRoute, private inventoryService: InventoryService, private router: Router) {
    this.route.params.subscribe(params => this.facKey$ = params.Facility_Key);
    this.route.params.subscribe(params => this.floorKey$ = params.Floor_Key);
    this.route.params.subscribe(params => this.zoneKey$ = params.Zone_Key);
  }


  selectFloorfromBuildings(facKey) {
    this.inventoryService
      .getallFloorList(facKey)
      .subscribe((data: Inventory[]) => {
        this.floorList = data;
        // this.zoneEditValues[0].FloorKey=null;
      });
  }

  updateZone(FacilityKey,FacilityName,FloorName, FloorKey, ZoneKey, ZoneName) {
    debugger;
    if (!FacilityKey) {
      FacilityKey = null;
      alert("Building name is not provided !");
    }
    else if (!FloorKey) {
      FloorKey = null;
      alert("Floor is not provided !");
    }
    else if (!ZoneName) {
      ZoneName = null;
      alert("ZoneName is not provided !");
    }
    else {

      this.inventoryService.checkForZone(FacilityKey, FloorKey, ZoneName).subscribe((data: Inventory[]) => {
        this.zone = data;
        if (data.length > 0) {
          alert("Zone already present !");
        }
        else if (data.length == 0) {
          this.inventoryService.updateZone(FacilityKey,FacilityName,FloorName, FloorKey, ZoneKey, ZoneName)
          .subscribe(res => this.router.navigateByUrl('/Zoneview'));
        }
      });


    }
  }
  ngOnInit() {
    //building list for dropdown
    this.inventoryService
      .getallBuildingList()
      .subscribe((data: Inventory[]) => {
        this.buildingList = data;
      });

    // floor list for dropdown
    this.inventoryService
      .getallFloorList(this.facKey$)
      .subscribe((data: Inventory[]) => {
        this.floorList = data;
      });
    //zone details
    this.inventoryService
      .EditZoneAutoGenerate(this.zoneKey$)
      .subscribe((data: Inventory[]) => {
        debugger;
        this.zoneEditValues = data;
      });
  }
}

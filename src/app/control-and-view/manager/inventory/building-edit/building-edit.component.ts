import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute,Router } from "@angular/router";
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-building-edit',
  templateUrl: './building-edit.component.html',
  styleUrls: ['./building-edit.component.scss']
})
export class BuildingEditComponent implements OnInit {
  facKey$: Object;
  build: Inventory[];


  constructor(private route: ActivatedRoute, private inventoryService: InventoryService,private router: Router) {
    this.route.params.subscribe(params => this.facKey$ = params.Facility_Key);
  }

  updateBuilding(FacilityName, FacilityKey) {
    this.inventoryService.UpdateBuilding(FacilityName, FacilityKey)
    .subscribe((data: Inventory[]) => { 
      alert("Building updated successfully");
      this.router.navigateByUrl('/Buildview');
    });
  }

  ngOnInit() {
    
    this.inventoryService.EditFacility(this.facKey$).subscribe((data: Inventory[]) => {
      this.build = data;
      debugger;
    });
  }
  }



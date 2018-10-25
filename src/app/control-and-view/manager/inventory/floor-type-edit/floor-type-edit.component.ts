import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from '../../../../service/inventory.service';

@Component({
  selector: 'app-floor-type-edit',
  templateUrl: './floor-type-edit.component.html',
  styleUrls: ['./floor-type-edit.component.scss']
})
export class FloorTypeEDitComponent implements OnInit {
  flrTypeKey$: Object;
  flrType: Array<any>;


  constructor(private route: ActivatedRoute, private inventoryService: InventoryService, private router: Router) {
    this.route.params.subscribe(params => this.flrTypeKey$ = params.FloorTypeKey);
  }

  updateFloorType(FloorTypeName) {
    debugger;
    if (!FloorTypeName) {
      alert("Please provide a FloorType Name");
    } else {
      this.inventoryService.checkForNewFloorType(FloorTypeName).subscribe((data: Array<any>) => {
        if (data.length > 0) {
          alert("FloorType already present");
        }
        else {
          this.inventoryService.UpdateFloorType(FloorTypeName, this.flrTypeKey$).subscribe(res => this.router.navigateByUrl('/FloorTypeView'));
        }
      });
    }
  }

  ngOnInit() {

    this.inventoryService.EditFloorType(this.flrTypeKey$).subscribe((data: Array<any>) => {
      this.flrType = data[0];
    });
  }
}

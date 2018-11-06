import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inventory } from '../../../../model-class/Inventory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from '../../../../service/inventory.service';
@Component({
  selector: 'app-floor-create',
  templateUrl: './floor-create.component.html',
  styleUrls: ['./floor-create.component.scss']
})
export class FloorCreateComponent implements OnInit {

  flooroptions: Inventory[];
  floorcreate: FormGroup;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  constructor(private router: Router, private fb: FormBuilder, private inventoryService: InventoryService) {

    this.floorcreate = fb.group({
      FacilityKey: ['', Validators.required],
      FloorName: ['', Validators.required],
      FloorDescription: ['', Validators.required]
    });
  }

  addFloor(FacilityKey, FloorName, FloorDescription) {
    if(FloorName && !FloorName.trim()){
      alert("Please Enter Floor Name!");
      return;
    }
    if(FloorDescription && !FloorDescription.trim()){
      alert("Please Enter Floor Description!");
      return;
    }
    if (!FacilityKey) {
      alert("Please select a building name!");
    } else if (!FloorName) {
      alert("Enter floor name!");
    }
    else if (!FloorDescription) {
      alert("Enter floor description!");
    }
    else {

      this.inventoryService.createFloors(FacilityKey, FloorName, FloorDescription, this.employeekey, this.OrganizationID)
        .subscribe((data: Inventory[]) => {
          alert("Floor created successfully");
          this.router.navigateByUrl('/Floorview');
        });
    }
  }

  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.inventoryService
      .getallBuildingList(this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.flooroptions = data;
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CreatebuildingService} from '../../../../service/createbuilding.service';
import { Inventory } from '../../../../model-class/Inventory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-createbuilding',
  templateUrl: './createbuilding.component.html',
  styleUrls: ['./createbuilding.component.scss']
})
export class CreatebuildingComponent implements OnInit {

  
  createbuilding: FormGroup; constructor(private router: Router,private fb: FormBuilder,private CreatebuildingService: CreatebuildingService) {

    this.createbuilding = fb.group({
      newbuildingName: ['', Validators.required]
      });
  }
  

  addBuilding(newbuildingName) {
    if(!newbuildingName)
    {
      alert("Please Enter Building Name!")
    }else
    {
 
    this.CreatebuildingService.createBuildings(newbuildingName)
    .subscribe((data: Inventory[]) => {
      alert("Building created successfully");
      this.router.navigateByUrl('/Buildview');
    });
  }
}

                
  ngOnInit() {

    
  }

}

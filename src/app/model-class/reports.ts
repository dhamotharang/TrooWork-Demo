import { Time } from "@angular/common";

export interface Reports {
    SupervisorKey: number;
    SupervisorText: String;

    EmployeeKey: number;
    InspectionOrderKey: number;
    TemplateId: number;
    TemplateName: string;
    InspectionDate: Date;
    InspectionTime: Time;
    FacilityName: string;

    RoomId: string;
    RoomType: string;

    LastName: string;
    FirstName: string;
    EmployeeName: string;
    InspectionCompletedBy: number;
    id: number;
    totalItems: 10;

    EquipmentKey: number;
    EquipmentName: string;
    EquipmentTypeKey: number;
    EquipmentType:string;
    EquipmentTypeText: string;
    EquipmentTypeDescription: string;
    
    FacilityKey: number;
    FacilityText: string;

    FloorKey:number;
    FloorName:string;

    ZoneKey:number;
    ZoneName:string;

    RoomTypeKey:number;
    RoomTypeName:string;

    Barcode1:number;

}

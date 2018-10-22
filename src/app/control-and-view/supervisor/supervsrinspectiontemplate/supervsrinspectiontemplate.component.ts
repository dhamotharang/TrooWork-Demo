import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../../../service/inspection.service';
import { Inspection } from '../../../model-class/Inspection';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supervsrinspectiontemplate',
  templateUrl: './supervsrinspectiontemplate.component.html',
  styleUrls: ['./supervsrinspectiontemplate.component.scss']
})
export class SupervsrinspectiontemplateComponent implements OnInit {
  viewEmpInspectionDetails;
  inspKey$;
  names;
  temp_id;
  inspectionDetail;
  inspectionDetail1;
  ScoreName;
  TemplateQuestionID;
  questionsCount;
  val;
  Notes;
  Temp_templateId;
  ind=0;
  TemplateDetails;
  lastIndexValue;
  // for star rating 
  starList: boolean[] = [true,true,true,true,true]; 
  rating:number; 
  
  setStar(data:any){
    this.rating=data+1;                               
    for(var i=0;i<=4;i++){  
      if(i<=data){  
        this.starList[i]=false;  
      }  
      else{  
        this.starList[i]=true;  
      }  
   }  
}  
// for star rating 

  convert_DT(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  arrayUnique(array){
    var a = array.concat();
    for(var i=0; i<a.length; ++i){
        for(var j=i+1; j<a.length; ++j){
            if(a[i] === a[j]){
                a.splice(j--,1);
            }
        }
    }
    return a;
};

 lastIndex(array,val){
  // debugger;
  var a =[];
  a= array;
  var b=val;
  var z =null;
  for(var i=0;i<a.length;i++){
      if(b == a[i])
          z=i;
  }
return z;
}
Scoringtype = {ratingValue:[],inspectionNotes:[],rating_yn:[]};
          
            templateQuestionvalues = {};
            today_DT = this.convert_DT(new Date());
            count = 0;
            saveInspection= {};
             //this.questionsCount=0;

  constructor(private inspectionService: InspectionService,private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.inspKey$ = params.InspectionOrderKey);
  }
  

  ngOnInit() {

    this.inspectionService.InspectionDetails(this.inspKey$).subscribe((data: any[]) => {
      this.viewEmpInspectionDetails = data;
      debugger;
      this.questionsCount=this.viewEmpInspectionDetails.length;
      this.val=data;
      if(this.viewEmpInspectionDetails[0].ScoreName === 'Yes/No')
      {
       // debugger;
        this.names = ['Yes', 'No'];
       this.ScoreName=this.viewEmpInspectionDetails[0].ScoreName;
      }
      else if(this.viewEmpInspectionDetails[0].ScoreName === 'Pass/Fail')
      {
        this.names= ['Fail','N/A'];
        this.ScoreName=this.viewEmpInspectionDetails[0].ScoreName;
      }
       this.Temp_templateId=this.viewEmpInspectionDetails[0].TemplateID;
      this.inspectionService
          .templateQuestionService(this.viewEmpInspectionDetails[0].TemplateID).subscribe((data: any[]) => {
            this.TemplateDetails=data;
            // this.questionsCount=this.TemplateDetails.length;

          });
  });
  }
  saveRatings(TemplateQuestionID,ScoreName)
  {
  
  //debugger;
    if(ScoreName === 'Yes/No' || ScoreName==='Pass/Fail'){
      // console.log($scope.Scoringtype);
      var length = Object.keys(this.Scoringtype.rating_yn).length;
      var arrayLength = this.Scoringtype.rating_yn.length;
      var value =this.Scoringtype.rating_yn[arrayLength - 1];
      this.Scoringtype.ratingValue.push({rating:value,questionID:TemplateQuestionID});
  }
  // else{
  //   this.Scoringtype.ratingValue.push({rating:this.rating,questionID:TemplateQuestionID});
  // }
  else if(ScoreName === '5 Star'|| ScoreName==='3 Star'){
    var length = Object.keys(this.starList).length;
    var arrayLength = this.starList.length;
    var values =this.starList[arrayLength - 1];
    this.Scoringtype.ratingValue.push({rating:values,questionID:TemplateQuestionID});
  }
  console.log(this.Scoringtype);
  }
  inspectionCompleted()
  {
  //debugger;
    var temp=[];
     var choices1 = [];
    choices1[0] = this.Scoringtype;
     console.log(choices1);
                  // console.log("qstn length "+$scope.questionsCount);
     var totalQuestions = this.questionsCount;
    var indexObj = [];
    var ratingIndexlist = [];
     var noteIndexList = [];
      var questionidList =[];
      if(this.ScoreName === 'Yes/No'||this.ScoreName === 'Pass/Fail')
      {
        for (var j = 0; j < this.val.length; j++) 
        {
                temp.push("" + this.val[j].TemplateQuestionID);
       }
       ratingIndexlist = Object.keys(this.Scoringtype.rating_yn);
       noteIndexList = Object.keys(this.Scoringtype.inspectionNotes);
        questionidList = this.arrayUnique(ratingIndexlist.concat(temp));
       // console.log(questionidList);
     }
     else
     {
        noteIndexList = Object.keys(this.Scoringtype.inspectionNotes);
        indexObj = this.Scoringtype.ratingValue;
        if(indexObj)
        {
           for(var j = 0; j<indexObj.length; j++)
            {
              // if(indexObj[j].rating == 0)
               ratingIndexlist.push(""+indexObj[j].questionID);
            }
        }
      // console.log("We go the notes in index "+noteIndexList+" and value "+$scope.Scoringtype.inspectionNotes[noteIndexList]);
        questionidList = this.arrayUnique(noteIndexList.concat(ratingIndexlist));
      // console.log(questionidList);
        }
  
      if (questionidList.length === totalQuestions && this.ScoreName === 'Pass/Fail')
       {
          var questionValues = "Pass";
          var starRating = null;
          var notes = null;
          var questionid = null;
          var i = 0;
          var j = 0;
          var k = 0;      
          
            for (var i = i; i < questionidList.length; i++) 
            {// includes actual qn ids
              questionValues = "Pass";
              notes = null;
              questionid = questionidList[i];
              for (j = 0; j < noteIndexList.length; j++)
               {
                  if (noteIndexList[j] === questionid)
                   {
                      notes =this.Scoringtype.inspectionNotes[questionid];
                     // console.log("Aneesh got note inside if as " + notes + " " + questionid + " " + " questionidList" + questionidList.length + $scope.Scoringtype.inspectionNotes);
                      break;
                  }
  
                }
  
                for (var k = 0; k < ratingIndexlist.length; k++) 
                {
                 // var lastIndexValue =any;
                  if (ratingIndexlist[k] === questionid) 
                  {
                     this.lastIndexValue = this.lastIndex(ratingIndexlist, questionidList[i]);
                       console.log("last indexfor "+ratingIndexlist[k] +" is " + this.lastIndexValue);
  
                      if (this.lastIndexValue !== null) 
                      {
                          questionValues = this.Scoringtype.ratingValue[this.lastIndexValue].rating;
                      } else
                       {
                          questionValues = "Pass";
                    }
                      break;
                  }
             }
              
              this.inspectionDetail=
              {
                OrganizationID:21,
                inspectionkey:this.inspKey$,
                employeekey:2861,
                inspectionnotes:notes,
                templateQstnValues:questionValues,
                templateid:this.Temp_templateId,
                questionid:questionid,
     
              };
              //debugger;
              this.inspectionService
    .InspectionSaveService(this.inspectionDetail)
  
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Inspection',
  // template: 'Inspection Submitted Successfully!'
  // });
  
         }
      this.inspectionDetail1=
              {
                OrganizationID:21,
                InspectionorderKey:this.inspKey$,
                EmployeeKey:2861,
                   
              };
              this.inspectionService
            .inspectionCompletedService(this.inspectionDetail1)
             
            }
            else if (questionidList.length === totalQuestions && this.ScoreName !== 'Pass/Fail')
            {
               questionValues = null;
               var starRating = null;
                var notes = null;
               var questionid = null;
                var i=0;
                var j=0;
               var k=0;
  
                //debugger;
                for( i=i; i<questionidList.length; i++)
                {// includes actual qn ids
                   questionValues = null;
                    notes = null;
                    questionid = questionidList[i];
                    for(j=0; j<noteIndexList.length; j++)
                    {
                        if(noteIndexList[j] === questionid)
                        {
                         notes = this.Scoringtype.inspectionNotes[questionid];
                         // console.log("Aneesh got note inside if as "+notes+" "+questionid+" "+" questionidList"+questionidList.length+$scope.Scoringtype.inspectionNotes);
                         break;
                       }
                     }
                  for(k=0; k<ratingIndexlist.length; k++)
                  {
                     this. lastIndexValue =0;
                      if(ratingIndexlist[k] === questionid)
                        {
                        this. lastIndexValue =this.lastIndex(ratingIndexlist,questionidList[i]);
                         // console.log("last indexfor "+ratingIndexlist[k] +" is " + lastIndexValue);
                         var x= this.lastIndexValue.length - ratingIndexlist.length;
                         if(this.lastIndexValue != null)
                         {
                          questionValues = this.Scoringtype.ratingValue[this.lastIndexValue].rating;
                         } 
                         else
                         {
                          questionValues = null;
                         }
                          break;
                      }
                  }
                 
                  this.inspectionDetail=
                  {
                    OrganizationID:21,
                    inspectionkey:this.inspKey$,
                    employeekey:2861,
                    inspectionnotes:notes,
                    templateQstnValues:questionValues,
                    templateid:this.Temp_templateId,
                    questionid:questionid,
         
                  };
                 // debugger;
                  this.inspectionService
        .InspectionSaveService(this.inspectionDetail)
      
      //   var alertPopup = $ionicPopup.alert({
      //     title: 'Inspection',
      // template: 'Inspection Submitted Successfully!'
      // });
      
             }
          this.inspectionDetail1=
                  {
                    OrganizationID:21,
                    InspectionorderKey:this.inspKey$,
                    EmployeeKey:2861,
                       
                  };
                  this.inspectionService
                .inspectionCompletedService(this.inspectionDetail1)
                 
                }
         }    


}

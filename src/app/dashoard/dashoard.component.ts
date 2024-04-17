import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListServiceService } from '../shared/list-service.service';
import { ListElement } from '../shared/listelement';

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashoard.component.html',
  styleUrls: ['./dashoard.component.css']
})
export class DashoardComponent implements  OnInit {

  public favItems:ListElement[]=[];

   constructor(private router:Router,
    public listServiceService: ListServiceService
  ){}

  public ngOnInit(){
      this.listServiceService.favItemsSub.subscribe( items=>{
        this.favItems=items.filter(item => item.checked===true);
      }) 
  }

  goToList(){
   this.router.navigate(['/list'])
  }
}

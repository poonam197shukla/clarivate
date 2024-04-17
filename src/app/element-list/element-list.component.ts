import { Component, ElementRef, EventEmitter, HostListener, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListServiceService } from '../shared/list-service.service';
import { ListElement } from '../shared/listelement';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})
export class ElementListComponent implements OnInit, OnDestroy {

  public listOfItem:ListElement[] = [];
  public favItems:ListElement[]=[];
  isLoading: boolean = false; // To prevent multiple simultaneous requests
  start: number = 0; // Start index
  end: number = 10; // End index
  public scrollPosition!:number;

  @ViewChild('tablecontainer') tablecontainer!: ElementRef;
  
  constructor(private router: Router,
    private listServiceService: ListServiceService
  ){}


  public ngOnInit(){
      this.getList();    
  }

  getList(): void {
    this.isLoading = true;
  
    const apiDataTemp = this.listServiceService?.getlistData(this.start, this.end);
    const localStorageDataTemp = this.listServiceService.getLocalList('fav');
    // const scroll = this.listServiceService.getScroll('scroll'); // Assuming getScroll returns a number directly
    // this.tablecontainer.nativeElement.scrollTop = scroll;
  
    forkJoin({
      apiData: apiDataTemp,
      localStorageData: localStorageDataTemp
    }).subscribe({
      next: ({ apiData, localStorageData }) => {
        this.listOfItem = [...this.listOfItem, ...apiData]; // Update with API data
  
        if (localStorageData && localStorageData.length > 0) {
          this.listOfItem = [...localStorageData]; // Update with localStorage data if available
        }

        // Set scroll value
        // this.tablecontainer.nativeElement.scrollTop = scroll;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error fetching data:', err);
        this.isLoading = false;
      }
    });
  }
  

  @HostListener('window:scroll', ['$event'])
  onTableScroll(): void {
    if (this.shouldLoadData()) {
      this.start += 10;
      this.end += 10;
      this.getList();
    }
  }

  shouldLoadData(): boolean {
    this.scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.offsetHeight;
    
    return !this.isLoading && this.scrollPosition >= documentHeight;
  }

  public ngOnDestroy(){
    this.listServiceService.setLocalList('fav',this.listOfItem);
    //this.listServiceService.setScroll('scroll', this.scrollPosition);
  }

  backToDashboard(){
    this.router.navigate(['/']);
    setTimeout(() => {
      this.listServiceService.favItemsSub.next(this.listOfItem);
    }, );
  }

  addToFavs(event:ListElement){
    this.listOfItem.filter(item=>{
      if(item.id===event.id){
        if(!event.checked){
          event.checked=true;
        }
        else{
          event.checked=false;
        } 
      }
    })
  }

  
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementListComponent } from './element-list.component';
import { ListElement } from '../shared/listelement';
import { Subject, of } from 'rxjs';
import { ListServiceService } from '../shared/list-service.service';
import { RouterTestingModule } from '@angular/router/testing';
class MockListServiceService {
  getlistData(start: number, end: number) {
    return of([]);
  }

  getLocalList(key: string) {
    return of([]);
  }

  setLocalList(key: string, value: any) {}

  favItemsSub = new Subject<ListElement[]>();
}

describe('ElementListComponent', () => {
  let component: ElementListComponent;
  let fixture: ComponentFixture<ElementListComponent>;

  let mockListServiceService: MockListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ElementListComponent],
      providers: [
        { provide: ListServiceService, useValue: MockListServiceService }
      ]
    });
    fixture = TestBed.createComponent(ElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on ngOnInit', () => {
    spyOn(mockListServiceService, 'getlistData').and.returnValue(of([]));
    spyOn(mockListServiceService, 'getLocalList').and.returnValue(of([]));
    component.ngOnInit();
    expect(mockListServiceService.getlistData).toHaveBeenCalledWith(0, 10);
    expect(component.listOfItem.length).toBe(1);
  });

  it('should handle scroll event and load more data', () => {
    spyOn(component, 'getList').and.callThrough();
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(100);
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(200);
    component.onTableScroll();

    expect(component.getList).toHaveBeenCalled();
    expect(component.start).toBe(10);
    expect(component.end).toBe(20);
  });
});

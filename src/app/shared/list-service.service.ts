import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { ListElement } from './listelement';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  private elementUrl = 'https://jsonplaceholder.typicode.com/albums/1/photos';  //url to get the details in json Format
  public favItemsSub = new Subject<ListElement[]>(); // subject to update the itemlist
  
  constructor(private http: HttpClient) { }
  
  //to call the API to get the photo details
  //10 elements will be loaded on each scroll
  getlistData(start: number, end:number): Observable<ListElement[]>{
    const url= `${this.elementUrl}?_start=${start}&_end=${end}`;
    return this.http.get<ListElement[]>(url);
  }

  //Set the list to local storage to fetch later without giving server call
  setLocalList(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Error while setting local storage', err);
    }
  }

   //get the list to local storage to fetch later without giving server call
  getLocalList(key: string): Observable<ListElement[]> {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        return of(JSON.parse(data));
      } else {
        return of([]); // Return an empty array if no data found
      }
    } catch (err) {
      console.error('Error while getting local storage key ', key, err);
      return of([]); // Return an empty array in case of error
    }
  }

   //Set the scroll position to local storage to fetch later without giving server call
  setScroll(key: string, scrollPosition:number) {
    try {
      localStorage.setItem(key, JSON.stringify(scrollPosition));
    } catch (err) {
      console.error('Error while setting local storage', err);
    }
  }

  //get the scroll position to local storage to fetch later without giving server call
  getScroll(key: string): any {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      console.error('Error while getting local storage key ', key, err);
      return '';
    }
  }

  
}

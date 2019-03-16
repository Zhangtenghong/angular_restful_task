import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) { 
    this.getTasks();
  }
  getTasks(){
  let first_Observable = this._http.get('/tasks');
  first_Observable.subscribe(data => console.log("Got our tasks!", data));
  
  let second_Observable = this._http.get('/tasks/:id');
  second_Observable.subscribe(data => console.log("Got our tasks_id!", data));

  let third_Observable = this._http.delete('/tasks:id');
  third_Observable.subscribe(data => console.log("Got our tasks!", data));
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) { 
  }
  getTasks(){
    return this._http.get('/tasks');
  }
  findTask(id){
    return this._http.get('/tasks/'+id);
  }
  addTask(newTask){
    return this._http.post('/tasks', newTask);
  }
  editTask(editedTask){
    return this._http.put('/tasks/'+ editedTask._id, editedTask);
  }
  deleteTask(id){
    return this._http.delete('/tasks/'+id);
  }
  
}
import { HttpService } from './http.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
    tasks;
    singleTask:any;
    constructor(private _httpService: HttpService){
      this.getTasksFromService();
      this.tasks=[];
    }
    getTasksFromService(){
      let dataFromService_1=this._httpService.getTasks();
      console.log("Get the data");
      dataFromService_1.subscribe((data) =>{
        this.tasks = data;
        console.log(this.tasks)
      })
    }
    findTaskFromService(id){
      let dataFromService_2=this._httpService.findTask(id);
      console.log("Task is", id);
      dataFromService_2.subscribe((data) =>{
        this.singleTask = data;
      })
    }
}
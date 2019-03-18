import { HttpService } from './http.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    tasks;
    singleTask:any;
    newTask: any;
    editedTask: any;
    editable:boolean;

    constructor(private _httpService: HttpService){
      this.tasks=[];
      this.editedTask={title:"", description:""}
      this.newTask={title:"", description:""}
      this.editable=false
    }

    ngOnInit(){
      this.getTasksFromService();
    }

    onSubmit(){
      let observable=this._httpService.addTask(this.newTask);
      observable.subscribe(data =>{
        console.log("Got data from post back", data);
        this.newTask={title:"", description:""}
        this.getTasksFromService();
      })
    }

    updateTask(){
      let observable2=this._httpService.editTask(this.editedTask);
      observable2.subscribe((data)=>{
        this.editedTask={title:"", description:""}
        this.editable=false
        this.getTasksFromService();
      })
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
        console.log(data);
        this.singleTask = data;
        console.log(this.singleTask)
      })
    }

    editTaskFromService(id){
      let dataFromService_4=this._httpService.findTask(id);
      dataFromService_4.subscribe((data) =>{
        this.editedTask = data;
        this.editable = true;
      })
    }

    deleteTaskFromService(id){
      let dataFromService_3=this._httpService.deleteTask(id);
      console.log("Delete the data", id);
      dataFromService_3.subscribe()
      this.getTasksFromService();
      }
}
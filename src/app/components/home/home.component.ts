import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from 'src/app/model/task';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  $user = this.authService.currentUser$;
  taskObj: Task = new Task();
  taskArr: Task[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(
    private authService: AuthenticateService,
    private crudService: CrudService
  ) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTasks();
  }

  addTask() {
    this.taskObj.taskName = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (error) => {
        alert(error);
      }
    );
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(
      (res) => {
        this.taskArr = res;
      },
      (error) => {
        alert('Unable to get all tasks');
      }
    );
  }

  editTask() {
    this.taskObj.taskName = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (error) => {
        alert('Failed to update task');
      }
    );
  }

  deleteTask(eTask: Task) {
    this.crudService.deleteTask(eTask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (error) => {
        alert('Failed to detele task');
      }
    );
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.taskName;
  }
}

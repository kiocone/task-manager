import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filters.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private task: Task[] = [];

  getAllTasks(): Task[] {
    return this.task;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.description.toLocaleLowerCase().includes(search) ||
          task.title.toLocaleLowerCase().includes(search)
        ) {
          return true;
        } else {
          return false;
        }
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.task.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.task.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.task = this.task.filter((task) => task.id != id);
    /* can implement this other approach
    const task = this.getTaskById(id);
    const index = this.task.indexOf(task);
    this.task.splice(index, 1);
    */
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    this.task.find((task) => {
      if (task.id === id) {
        console.log(task);
        task.status = status;
        console.log(task);
      }
    });
    return this.getTaskById(id);
  }

  updateTaskDescription(id: string, description: string): Task {
    const task = this.getTaskById(id);
    console.log(task);
    task.description = description;
    console.log(task);
    return task;
  }
}

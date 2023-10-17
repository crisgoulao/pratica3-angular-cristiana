import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    // Carregar tarefas da localStorage ao inicializar o serviço
    this.loadTasksFromLocalStorage();
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    task.id = this.generateTaskId();
    this.tasks.push(task);
    this.saveTasksToLocalStorage(); // Salvar tarefas após adição
  }

  editTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.saveTasksToLocalStorage(); // Salvar tarefas após edição
    }
  }

  deleteTask(taskId: number): void {
    const index = this.tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage(); // Salvar tarefas após exclusão
    }
  }

  getTaskById(taskId: number): Task | undefined {
    return this.tasks.find(task => task.id === taskId);
  }

  private generateTaskId(): number {
    const ids = this.tasks.map(t => t.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }

  private loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

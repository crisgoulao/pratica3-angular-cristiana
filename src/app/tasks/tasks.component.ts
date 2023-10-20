import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Dialog } from 'primeng/dialog'; // Importa el módulo Dialog de PrimeNG
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  taskForm: FormGroup;
  tasks: Task[] = [];
  displayConfirmation: boolean = false; // Variable para mostrar/ocultar el modal de confirmación
  taskToDelete: Task | null = null; // Tarea a ser eliminada

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    if (this.taskForm.valid) {
      const title = this.taskForm.get('title')?.value || '';
      this.taskService.addTask({ id: 0, title, completed: false }); // Asegúrate de proporcionar un ID
      this.taskForm.reset();
      this.tasks = this.taskService.getTasks();
    }
  }

  deleteTask(task: Task) {
    this.taskToDelete = task;
    this.displayConfirmation = true;
  }

  // Método para mostrar el modal de confirmación
  showConfirmation(task: Task): void {
    this.taskToDelete = task;
    this.displayConfirmation = true;
  }

  // Método para confirmar la eliminación
  confirmDelete() {
    if (this.taskToDelete) {
      this.taskService.deleteTask(this.taskToDelete.id);
      this.displayConfirmation = false;
      this.tasks = this.taskService.getTasks(); // Atualize a lista de tarefas
      this.taskToDelete = null;
    }
  }


  // Método para cancelar la eliminación
  cancelDelete(): void {
    this.taskToDelete = null;
    this.displayConfirmation = false;
  }

  editTask(task: Task) {
    this.router.navigate(['/edit-task', task.id]);
  }

  updateTask(task: Task): void {
    this.taskService.editTask(task);
  }
}

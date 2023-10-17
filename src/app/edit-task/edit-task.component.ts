import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  editForm: FormGroup; // Formulario para editar una tarea
  taskId: number = 0; // ID de la tarea a editar
  task: Task | null = null; // Tarea que se va a editar

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    // Inicializa el formulario de edición con un campo 'title'
    this.editForm = this.fb.group({
      title: ['']
    });
  }

  ngOnInit() {
    // Obtiene el ID de la tarea desde los parámetros de la URL
    this.taskId = +this.route.snapshot.params['id'];

    // Busca la tarea con el ID correspondiente
    const foundTask = this.taskService.getTaskById(this.taskId);

    if (foundTask) {
      // Si se encuentra la tarea, asigna sus datos al formulario
      this.task = foundTask;
      this.editForm.patchValue({
        title: this.task.title
      });
    }
  }

  // Guarda los cambios realizados en la tarea
  saveChanges() {
    if (this.task) {
      // Actualiza el título de la tarea con el valor del formulario
      this.task.title = this.editForm.get('title')?.value;

      // Llama al servicio para editar la tarea
      this.taskService.editTask(this.task);

      // Reinicia el formulario y redirige de vuelta a la lista de tareas
      this.resetForm();
      this.router.navigate(['/tasks']);
    }
  }

  // Cancela la edición y redirige de vuelta a la lista de tareas
  cancelEdit() {
    this.resetForm();
    this.router.navigate(['/tasks']);
  }

  // Reinicia el formulario de edición
  resetForm() {
    this.editForm = this.fb.group({
      title: ['']
    });
  }
}

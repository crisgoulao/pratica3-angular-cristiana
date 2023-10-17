import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes: Routes = [
  { path: 'tasks', component: TasksComponent }, // Rota padrão para a lista de tarefas
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'edit-task/:id', component: EditTaskComponent }// Rota para o formulário de edição

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

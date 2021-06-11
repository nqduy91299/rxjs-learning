import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleObservableComponent } from './rxjs/simple-observable/simple-observable.component';
import { StudentManagementComponent } from './students/student-management/student-management.component';

const routes: Routes = [
  { path: 'rxjs', component: SimpleObservableComponent },
  { path: 'std-management', component: StudentManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './components/movies/detail/detail.component';
import { HomeComponent } from './components/movies/home/home.component';
import { MovieContainerComponent } from './components/movies/movie-container/movie-container.component';
import { SimpleObservableComponent } from './components/rxjs/simple-observable/simple-observable.component';
import { StudentManagementComponent } from './components/students/student-management/student-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/std-management', pathMatch: 'full' },
  { path: 'rxjs', component: SimpleObservableComponent },
  { path: 'std-management', component: StudentManagementComponent },
  {
    path: 'movies',
    component: MovieContainerComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: ':id/detail', component: DetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SimpleObservableComponent } from './rxjs/simple-observable/simple-observable.component';
import { RouterModule } from '@angular/router';
import { StudentManagementComponent } from './students/student-management/student-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { InfoModalComponent } from './modals/info-modal/info-modal.component';
import { MovieContainerComponent } from './movies/movie-container/movie-container.component';
import { BadgeModule } from 'primeng/badge';
import { MoviesFavoriteComponent } from './modals/movies-favorite/movies-favorite.component';
import { HomeComponent } from './movies/home/home.component';
import { PosterComponent } from './movies/poster/poster.component';
import { CutStringPipe } from './pipes/cut-string.pipe';
import { MovieFavoriteItemComponent } from './movies/movie-favorite-item/movie-favorite-item.component';
import { DetailComponent } from './movies/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleObservableComponent,
    StudentManagementComponent,
    InfoModalComponent,
    MovieContainerComponent,
    MoviesFavoriteComponent,
    HomeComponent,
    PosterComponent,
    CutStringPipe,
    MovieFavoriteItemComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    RouterModule,
    DialogModule,
    TableModule,
    FormsModule,
    InputTextModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    BadgeModule,
    HttpClientModule,
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}

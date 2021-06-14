import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MovieLocal } from 'src/app/models/moveLocal.model';
import { FavoriteMoviesService } from 'src/app/services/favorite-movies.service';

@Component({
  selector: 'app-movies-favorite',
  templateUrl: './movies-favorite.component.html',
  styleUrls: ['./movies-favorite.component.scss'],
})
export class MoviesFavoriteComponent implements OnInit, OnChanges {
  @Input() isShow: boolean = false;
  @Output() isShowChange = new EventEmitter<boolean>();

  movies: MovieLocal[] = [];

  constructor(private favoriteService: FavoriteMoviesService) {}

  ngOnInit(): void {
    this.listenChangeFavorite();
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.isShow.currentValue) {
      this.updateMovies();
    }
  }

  updateMovies(): void {
    this.movies = this.favoriteService.getAllFavoriteMovie();
  }

  listenChangeFavorite(): void {
    this.favoriteService.favoriteMovie$.subscribe((data) =>
      this.updateMovies()
    );
  }

  removeAll(): void {
    this.favoriteService.removeAll();
  }

  closeModal() {
    this.isShowChange.emit(false);
  }
}

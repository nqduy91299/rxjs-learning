import { Component, OnInit, ViewChild } from '@angular/core';
import { FavoriteMoviesService } from 'src/app/services/favorite-movies.service';
import { MovieDbService } from 'src/app/services/movie-db.service';

@Component({
  selector: 'app-movie-container',
  templateUrl: './movie-container.component.html',
  styleUrls: ['./movie-container.component.scss'],
})
export class MovieContainerComponent implements OnInit {
  count: number;
  isShowFavorite: boolean = false;
  constructor(
    private favoriteService: FavoriteMoviesService,
    private movieService: MovieDbService
  ) {}

  ngOnInit(): void {
    this.count = this.favoriteService.countFavoriteMovies();
    this.countFavorite();
  }

  countFavorite() {
    this.favoriteService.favoriteMovie$.subscribe((data) => {
      this.count = this.favoriteService.countFavoriteMovies();
    });
  }

  showModalFavorite(): void {
    this.isShowFavorite = !this.isShowFavorite;
  }

  searchMovie(event) {
    const value = event.target.value;
    this.movieService.searchMovie(value);
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movies.model';
import { FavoriteMoviesService } from 'src/app/services/favorite-movies.service';
import { MovieDbService } from 'src/app/services/movie-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies$: Observable<Movie[]>;
  constructor(
    private movieService: MovieDbService,
    public favoriteService: FavoriteMoviesService
  ) {}

  ngOnInit(): void {
    this.movies$ = this.getUpcomingMovies();
  }

  getUpcomingMovies(): Observable<Movie[]> {
    return this.movieService.getUpcomingMovies();
  }

  isFavorite(id: number): boolean {
    return this.favoriteService.isThisFavoriteMovie(id);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/movies.model';
import { HOST_IMAGE } from 'src/app/services/constants';
import { FavoriteMoviesService } from 'src/app/services/favorite-movies.service';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
})
export class PosterComponent implements OnInit {
  @Input() movie: Movie;
  @Input() isFavorite: boolean = false;
  // @Output() isFavoriteChange = new EventEmitter<boolean>();
  srcImg: string;
  constructor(private favoriteService: FavoriteMoviesService) {}

  ngOnInit(): void {
    this.srcImg = HOST_IMAGE + this.movie.poster_path;
  }

  favoriteClick() {
    if (this.isFavorite) {
      this.unLike();
    } else {
      this.like();
    }
  }

  like(): void {
    this.favoriteService.setFavoriteMovie(
      this.movie.id,
      this.movie.title,
      this.movie.poster_path
    );
    this.isFavorite = !this.isFavorite;
  }

  unLike(): void {
    this.favoriteService.removeFavoriteMovie(this.movie.id);
    this.isFavorite = !this.isFavorite;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { MovieLocal } from 'src/app/models/moveLocal.model';
import { HOST_IMAGE } from 'src/app/services/constants';
import { FavoriteMoviesService } from 'src/app/services/favorite-movies.service';

@Component({
  selector: 'app-movie-favorite-item',
  templateUrl: './movie-favorite-item.component.html',
  styleUrls: ['./movie-favorite-item.component.scss'],
})
export class MovieFavoriteItemComponent implements OnInit {
  @Input() movie: MovieLocal;

  srcImg: string = '';
  constructor(private favoriteService: FavoriteMoviesService) {}

  ngOnInit(): void {
    this.srcImg = HOST_IMAGE + this.movie.image;
  }

  remove(): void {
    this.favoriteService.removeFavoriteMovie(this.movie.id);
  }
}

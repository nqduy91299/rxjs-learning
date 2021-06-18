import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movies.model';
import { Trailer } from 'src/app/models/trailer.model';
import { HOST_IMAGE } from 'src/app/services/constants';
import { FavoriteMoviesService } from 'src/app/services/favorite-movies.service';
import { MovieDbService } from 'src/app/services/movie-db.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  id: number;
  movie$: Observable<Movie>;
  host: string = HOST_IMAGE;
  isShow: boolean = false;
  isLove: boolean;
  videoTrailer$: Observable<Trailer[]>;
  youTubeUrl: string = 'https://www.youtube.com/embed/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieDbService,
    private favoriteService: FavoriteMoviesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.movie$ = this.getDetail(this.id);
    this.isLove = this.checkLove(this.id);
    this.videoTrailer$ = this.getTrailer(this.id);
    this.videoTrailer$.subscribe((res) => console.log(res));
  }

  getDetail(id: number): Observable<Movie> {
    return this.movieService.getMovieById(id);
  }

  checkLove(id: number): boolean {
    return this.favoriteService.isThisFavoriteMovie(id);
  }

  favoriteClick(id: number, title: string, image: string) {
    if (this.isLove) {
      this.favoriteService.removeFavoriteMovie(id);
    } else {
      this.favoriteService.setFavoriteMovie(id, title, image);
    }
    this.isLove = !this.isLove;
  }

  getTrailer(id: number): Observable<Trailer[]> {
    return this.movieService.getTrailer(id);
  }
}

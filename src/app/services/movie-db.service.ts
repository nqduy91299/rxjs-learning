import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie, ResponseMovie } from '../models/movies.model';
import { Trailer } from '../models/trailer.model';
import { API_KEY, BRIDGE_KEY, HOST_MOVIES_API } from './constants';

@Injectable({
  providedIn: 'root',
})
export class MovieDbService {
  constructor(private httpClient: HttpClient) {}

  getUpcomingMovies(): Observable<Movie[]> {
    const path = '/movie/upcoming';
    return this.httpClient
      .get<ResponseMovie>(HOST_MOVIES_API + path + BRIDGE_KEY + API_KEY)
      .pipe(map((res) => res.results));
  }

  getMovieById(id: number): Observable<Movie> {
    const path = '/movie/' + id;
    return this.httpClient.get<Movie>(
      HOST_MOVIES_API + path + BRIDGE_KEY + API_KEY
    );
  }

  getTrailer(id: number): Observable<Trailer[]> {
    const path = `/movie/${id}/videos`;
    return this.httpClient
      .get<any>(HOST_MOVIES_API + path + BRIDGE_KEY + API_KEY)
      .pipe(map((t) => t.results));
  }

  searchMovie(query: string): Observable<Movie[]> {
    const path = '/search/movie';
    const param = new HttpParams({ fromObject: { query: query } });
    return this.httpClient
      .get<ResponseMovie>(HOST_MOVIES_API + path + BRIDGE_KEY + API_KEY, {
        params: param,
      })
      .pipe(map((t) => t.results));
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieLocal } from '../models/moveLocal.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteMoviesService {
  favorite = new Subject();
  public favoriteMovie$ = this.favorite.asObservable();

  favoriteMovies: MovieLocal[] = [];
  keyLs: string = 'favorite-movies';

  constructor() {
    this.favoriteMovies = this.getAllFavoriteMovie();
  }

  isThisFavoriteMovie(id: number): boolean {
    const result = this.favoriteMovies.findIndex((m) => m.id === id);
    return result !== -1 ? true : false;
  }

  getAllFavoriteMovie(): MovieLocal[] {
    if (!!!JSON.parse(localStorage.getItem(this.keyLs))) {
      localStorage.setItem(this.keyLs, JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem(this.keyLs));
  }

  setFavoriteMovie(id: number, title: string, imgURL: string): void {
    const newM: MovieLocal = {
      id: id,
      title: title,
      image: imgURL,
    };
    this.favoriteMovies = [...this.favoriteMovies, newM];
    localStorage.setItem(this.keyLs, JSON.stringify(this.favoriteMovies));
    this.favoriteClick();
  }
  removeFavoriteMovie(id: number): void {
    this.favoriteMovies = this.favoriteMovies.filter((m) => m.id != id);
    localStorage.setItem(this.keyLs, JSON.stringify(this.favoriteMovies));
    this.favoriteClick();
  }

  favoriteClick(data: boolean = true) {
    this.favorite.next(data);
  }

  countFavoriteMovies(): number {
    return this.getAllFavoriteMovie().length;
  }

  removeAll(): void {
    this.favoriteMovies = [];
    localStorage.setItem(this.keyLs, JSON.stringify(this.favoriteMovies));
    this.favoriteClick();
  }
}

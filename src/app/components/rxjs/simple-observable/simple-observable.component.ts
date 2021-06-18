import { Component, OnInit } from '@angular/core';
import { empty, interval, merge, Observable, of, Subject, timer } from 'rxjs';
import {
  map,
  mapTo,
  reduce,
  scan,
  startWith,
  switchMap,
  takeWhile,
} from 'rxjs/operators';
import { StudentFromNode } from 'src/app/models/student.model';
import { StudentNodejsService } from 'src/app/services/student-nodejs.service';

@Component({
  selector: 'app-simple-observable',
  templateUrl: './simple-observable.component.html',
  styleUrls: ['./simple-observable.component.scss'],
})
export class SimpleObservableComponent implements OnInit {
  student$: Observable<StudentFromNode[]>;

  interval$;
  pause$: Subject<boolean> = new Subject<boolean>();
  resume$: Subject<boolean> = new Subject<boolean>();
  timeCountDown: number = 20;
  timeDown$: Observable<number>;

  constructor(private studentNodejsService: StudentNodejsService) {}
  ngOnInit(): void {
    this.student$ = this.getAllStudent();
    this.interval$ = interval(1000).pipe(mapTo(-1));
    this.timeDown$ = this.countdown();
  }

  getAllStudent(): Observable<StudentFromNode[]> {
    return this.studentNodejsService.getStudent();
  }

  countdown(): Observable<number> {
    return merge(of(this.timeCountDown), this.pause$, this.resume$).pipe(
      startWith(false),
      switchMap((val) => (val ? this.interval$ : empty())),
      scan(
        (acc, curr: number) => (curr ? curr + acc : curr),
        this.timeCountDown
      ),
      takeWhile((v) => v >= 0)
    );
  }
}

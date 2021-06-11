import { Component } from '@angular/core';

interface navList {
  name: string;
  link: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navList: navList[] = [
    {
      name: 'Rxjs',
      link: '/rxjs',
    },
    {
      name: 'Student Management',
      link: '/std-management',
    },
    {
      name: 'UI-Prime',
      link: '/primeng',
    },
  ];
  constructor() {}
}

import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  title: string = '';
  subscription$: Subscription;

  constructor(private router: Router) {
    this.subscription$ = this.getRoutingData().subscribe((data: any) => {
      this.title = data.title;
      document.title = `AdminPro - ${this.title}`;
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getRoutingData(): Observable<any> {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}

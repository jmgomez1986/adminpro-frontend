import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  subsciption: Subscription;

  constructor() {

    // this.retornaObservable().pipe(retry(2)).subscribe({
    //   next: (valor) => console.log('Subs: ', valor),
    //   error: (err) => console.warn('Error: ', err),
    //   complete: () => console.info('Obs terminado'),
    // });

    this.subsciption = this.retornaIntervalo().subscribe((valor) => console.log(valor));
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(500).pipe(
      // take(10),
      map((val) => {
        return val + 1;
      }),
      filter(valor => valor % 2 === 0 ? true : false)
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llegó al valor 2');
        }
      }, 1000);
    });
  }
}
